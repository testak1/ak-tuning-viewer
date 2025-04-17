import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default function DynoChart({ brand, model, year, motor }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!motor) {
      setChartData([]);
      return;
    }

    setLoading(true);
    const params = new URLSearchParams({ brand, model, year, motor });
    fetch(`${import.meta.env.VITE_API_URL}/api/dyno-data?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((raw) => {
        if (Array.isArray(raw.rpm)) {
          const data = raw.rpm.map((r, i) => ({
            rpm: r,
            origHK: raw.original_hk[i],
            tunedHK: raw.tuned_hk[i],
            origNm: raw.original_nm[i],
            tunedNm: raw.tuned_nm[i],
          }));
          setChartData(data);
        } else {
          setChartData([]);
        }
      })
      .catch((err) => {
        console.error('Failed to load dyno data:', err);
        setChartData([]);
      })
      .finally(() => setLoading(false));
  }, [brand, model, year, motor]);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-bold mb-4">Dyno Chart</h3>

      {loading ? (
        <div>Loading chart...</div>
      ) : chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="rpm" stroke="#4B5563" />
            <YAxis
              yAxisId="left"
              label={{ value: 'HK', angle: -90, position: 'insideLeft', fill: '#4B5563' }}
              stroke="#4B5563"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: 'Nm', angle: 90, position: 'insideRight', fill: '#4B5563' }}
              stroke="#4B5563"
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="origHK" name="Original HK" stroke="#60A5FA" strokeWidth={2} />
            <Line yAxisId="left" type="monotone" dataKey="tunedHK" name="Tuned HK" stroke="#EF4444" strokeWidth={2} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="origNm"
              name="Original Nm"
              stroke="#60A5FA"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="tunedNm"
              name="Tuned Nm"
              stroke="#EF4444"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div>No dyno data available.</div>
      )}
    </div>
  );
}
