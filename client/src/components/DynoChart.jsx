// src/components/DynoChart.jsx
import React from 'react';
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

export default function DynoChart({ stages }) {
  // Build an array: [{ stage: 'Stage 1', power: 150, torque: 200 }, …]
  const chartData = Object.entries(stages).map(([stage, vals]) => ({
    stage,
    power: Number(vals.Power.replace(/\D/g, '')),   // extract digits
    torque: Number(vals.Torque.replace(/\D/g, ''))
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-bold mb-4">Dyno Chart (per stage)</h3>

      {chartData.length === 0 ? (
        <div>No stage data to chart.</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="stage" />
            <YAxis
              yAxisId="left"
              label={{ value: 'Power (HK)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: 'Torque (Nm)', angle: 90, position: 'insideRight' }}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="power"
              name="Power (HK)"
              stroke="#EF4444"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="torque"
              name="Torque (Nm)"
              stroke="#60A5FA"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
