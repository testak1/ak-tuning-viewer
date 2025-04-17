import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CardGrid from '../components/CardGrid';
import CardItem from '../components/CardItem';

export default function BrandPage() {
  const { brand } = useParams();
  const [models, setModels] = useState([]);
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(json => setModels(Object.keys(json[brand] || {})));
  }, [brand]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Modeller för {brand}</h1>
      <CardGrid>
        {models.map(m => (
          <Link key={m} to={`/cars/${encodeURIComponent(brand)}/${encodeURIComponent(m)}`}>
            <CardItem title={m} />
          </Link>
        ))}
      </CardGrid>
    </div>
  );
}
