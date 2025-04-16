
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AK Tuning Viewer</h1>

      <div className="space-y-3 mb-6">
        <select className="w-full p-2 border" onChange={e => setSelected({ model: e.target.value })}>
          <option value="">Välj modell</option>
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>

        {selected.model && (
          <select className="w-full p-2 border" onChange={e => setSelected(prev => ({ ...prev, year: e.target.value }))}>
            <option value="">Välj årsmodell</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        )}

        {selected.year && (
          <select className="w-full p-2 border" onChange={e => setSelected(prev => ({ ...prev, motor: e.target.value }))}>
            <option value="">Välj motor</option>
            {motors.map(motor => (
              <option key={motor} value={motor}>{motor}</option>
            ))}
          </select>
        )}
      </div>

      {selected.motor && (
        <>
          <div className="space-y-4">
            {Object.entries(stages).map(([stage, values]) => (
              <div key={stage} className="border p-3 rounded">
                <h2 className="font-semibold">{stage}</h2>
                <ul className="pl-4 list-disc text-sm">
                  {Object.entries(values).map(([k, v]) => (
                    <li key={k}><strong>{k}:</strong> {v}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-bold mb-2">Dynograf</h3>
            <img
              className="border rounded"
              src={`https://ak-tuning-viewer.onrender.com/dyno.png?brand=Audi&model=${encodeURIComponent(selected.model)}&year=${encodeURIComponent(selected.year)}&motor=${encodeURIComponent(selected.motor)}`}
              alt="Dyno chart"
            />
          </div>
        </>
      )}
    </div>
  );
}
