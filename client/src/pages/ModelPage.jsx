import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CardGrid from '../components/CardGrid';
import CardItem from '../components/CardItem';

export default function ModelPage() {
  const { brand, model } = useParams();
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/data`)
      .then(res => res.json())
      .then(json => setYears(Object.keys(json[brand]?.[model] || {})));
  }, [brand, model]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{model} årsmodeller</h1>
      <CardGrid>
        {years.map(y => (
          <Link
            key={y}
            to={`/cars/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(y)}`}
          >
            <CardItem title={y} />
          </Link>
        ))}
      </CardGrid>
    </div>
  );
}
