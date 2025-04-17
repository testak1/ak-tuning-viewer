import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardGrid from '../components/CardGrid';
import CardItem from '../components/CardItem';

export default function CarsPage() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/data`)
      .then(res => res.json())
      .then(setData);
  }, []);

  const brands = Object.keys(data);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Välj bilmärke</h1>
      <CardGrid>
        {brands.map(b => (
          <Link key={b} to={`/cars/${encodeURIComponent(b)}`}>
            <CardItem title={b} />
          </Link>
        ))}
      </CardGrid>
    </div>
  );
}
