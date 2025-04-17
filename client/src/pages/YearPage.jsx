// src/pages/YearPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CardGrid from '../components/CardGrid';
import CardItem from '../components/CardItem';

export default function YearPage() {
  const { brand, model, year } = useParams();
  const [motors, setMotors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/data`)
      .then(res => res.json())
      .then(json => {
        const motObj = json[brand]?.[model]?.[year] || {};
        setMotors(Object.keys(motObj));
      });
  }, [brand, model, year]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Motorer för {model} ({year})
      </h1>
      <CardGrid>
        {motors.map(m => (
          <Link
            key={m}
            to={`/cars/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(year)}/${encodeURIComponent(m)}`}
          >
            <CardItem title={m} />
          </Link>
        ))}
      </CardGrid>
    </div>
  );
}
