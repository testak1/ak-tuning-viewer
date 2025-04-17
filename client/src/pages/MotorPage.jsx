import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DynoChart from '../components/DynoChart';

export default function MotorPage() {
  const { brand, model, year, motor } = useParams();
  const [stages, setStages] = useState({});
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(json => {
        setStages(json[brand]?.[model]?.[year]?.[motor] || {});
      });
  }, [brand, model, year, motor]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{motor} — {model} {year}</h1>
      <div className="space-y-4 mb-8">
        {Object.entries(stages).map(([stage, vals]) => (
          <div key={stage} className="bg-white rounded-2xl shadow p-5">
            <h2 className="text-lg font-semibold mb-2">{stage}</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {Object.entries(vals).map(([k,v]) => (
                <li key={k}><strong>{k}:</strong> {v}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <DynoChart brand={brand} model={model} year={year} motor={motor} />
    </div>
  );
}
