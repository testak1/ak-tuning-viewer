import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState({});
  const [selected, setSelected] = useState({ brand: '', model: '', year: '', motor: '' });

  useEffect(() => {
    fetch('https://ak-tuning-viewer.onrender.com/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  const brands = Object.keys(data);
  const models = selected.brand ? Object.keys(data[selected.brand] || {}) : [];
  const years = selected.model ? Object.keys(data[selected.brand][selected.model] || {}) : [];
  const motors = selected.year ? Object.keys(data[selected.brand][selected.model][selected.year] || {}) : [];
  const stages = selected.motor ? data[selected.brand][selected.model][selected.year][selected.motor] : {};

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AK Tuning Viewer</h1>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <select className="p-2 border" onChange={e => setSelected({ brand: e.target.value })}>
          <option value="">Välj märke</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        {selected.brand && <select className="p-2 border" onChange={e => setSelected(p => ({ ...p, model: e.target.value }))}>
          <option value="">Välj modell</option>
          {models.map(m => <option key={m} value={m}>{m}</option>)}
        </select>}
        {selected.model && <select className="p-2 border" onChange={e => setSelected(p => ({ ...p, year: e.target.value }))}>
          <option value="">Välj årsmodell</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>}
        {selected.year && <select className="p-2 border" onChange={e => setSelected(p => ({ ...p, motor: e.target.value }))}>
          <option value="">Välj motor</option>
          {motors.map(m => <option key={m} value={m}>{m}</option>)}
        </select>}
      </div>

      {selected.motor && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(stages).map(([stage, values]) => (
              <div key={stage} className="border rounded p-4 shadow">
                <h2 className="font-semibold mb-2">{stage}</h2>
                <ul className="text-sm list-disc list-inside">
                  {Object.entries(values).map(([k, v]) => (
                    <li key={k}><strong>{k}:</strong> {v}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Dynograf</h3>
            <img
              className="border rounded shadow"
              src={`https://ak-tuning-viewer.onrender.com/dyno.png?brand=${encodeURIComponent(selected.brand)}&model=${encodeURIComponent(selected.model)}&year=${encodeURIComponent(selected.year)}&motor=${encodeURIComponent(selected.motor)}`}
              alt="Dyno chart"
            />
          </div>
        </div>
      )}
    </div>
  );
}