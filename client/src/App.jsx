// Uppdaterad App.jsx med modern layout
import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState({});
  const [selected, setSelected] = useState({
    model: '',
    year: '',
    motor: ''
  });

  useEffect(() => {
    fetch('https://ak-tuning-viewer.onrender.com/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  const models = Object.keys(data?.Audi || {});
  const years = selected.model ? Object.keys(data.Audi[selected.model]) : [];
  const motors = selected.year ? Object.keys(data.Audi[selected.model][selected.year]) : [];
  const stages = selected.motor ? data.Audi[selected.model][selected.year][selected.motor] : {};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">AK Tuning Viewer</h1>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6">
        <select className="flex-1 p-2 border rounded" onChange={e => setSelected({ model: e.target.value })}>
          <option value="">Välj modell</option>
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
        {selected.model && (
          <select className="flex-1 p-2 border rounded" onChange={e => setSelected(prev => ({ ...prev, year: e.target.value }))}>
            <option value="">Välj årsmodell</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        )}
        {selected.year && (
          <select className="flex-1 p-2 border rounded" onChange={e => setSelected(prev => ({ ...prev, motor: e.target.value }))}>
            <option value="">Välj motor</option>
            {motors.map(motor => (
              <option key={motor} value={motor}>{motor}</option>
            ))}
          </select>
        )}
      </div>

      {selected.motor && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(stages).map(([stage, values]) => (
              <div key={stage} className="bg-white p-4 shadow rounded">
                <h2 className="font-semibold text-lg mb-2">{stage}</h2>
                <ul className="pl-4 list-disc text-sm space-y-1">
                  {Object.entries(values).map(([k, v]) => (
                    <li key={k}><strong>{k}:</strong> {v}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Dynograf</h3>
            <img
              className="w-full border rounded shadow"
              src={`https://ak-tuning-viewer.onrender.com/dyno.png?brand=Audi&model=${encodeURIComponent(selected.model)}&year=${encodeURIComponent(selected.year)}&motor=${encodeURIComponent(selected.motor)}`}
              alt="Dyno chart"
            />
          </div>
        </>
      )}
    </div>
  );
}
