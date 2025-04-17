import React, { useEffect, useState } from 'react';
import SelectCard from './components/SelectCard';
import DynoChart from './components/DynoChart';

export default function App() {
  const [data, setData] = useState({});
  const [selected, setSelected] = useState({ model: '', year: '', motor: '' });

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData);
  }, []);

  const brand = 'Audi';
  const models = Object.keys(data[brand] || {});
  const years = selected.model ? Object.keys(data[brand][selected.model]) : [];
  const motors = selected.year ? Object.keys(data[brand][selected.model][selected.year]) : [];
  const stages = selected.motor ? data[brand][selected.model][selected.year][selected.motor] : {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="mx-auto max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">AK Tuning Viewer</h1>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <SelectCard label="Modell">
            <select
              className="w-full p-2 border rounded"
              value={selected.model}
              onChange={(e) => setSelected({ model: e.target.value, year: '', motor: '' })}
            >
              <option value="">Välj modell</option>
              {models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </SelectCard>

          {selected.model && (
            <SelectCard label="Årsmodell">
              <select
                className="w-full p-2 border rounded"
                value={selected.year}
                onChange={(e) => setSelected((p) => ({ ...p, year: e.target.value, motor: '' }))}
              >
                <option value="">Välj årsmodell</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </SelectCard>
          )}

          {selected.year && (
            <SelectCard label="Motor">
              <select
                className="w-full p-2 border rounded"
                value={selected.motor}
                onChange={(e) => setSelected((p) => ({ ...p, motor: e.target.value }))}
              >
                <option value="">Välj motor</option>
                {motors.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </SelectCard>
          )}
        </div>

        {selected.motor && (
          <>
            <div className="space-y-4 mb-8">
              {Object.entries(stages).map(([stage, values]) => (
                <div key={stage} className="bg-white rounded-2xl shadow p-5">
                  <h2 className="text-lg font-semibold mb-2">{stage}</h2>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {Object.entries(values).map(([k, v]) => (
                      <li key={k}><strong>{k}:</strong> {v}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <DynoChart brand={brand} model={selected.model} year={selected.year} motor={selected.motor} />
          </>
        )}
      </div>
    </div>
  );
}
