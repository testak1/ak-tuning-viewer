import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CarsPage from './pages/CarsPage';
import BrandPage from './pages/BrandPage';
import ModelPage from './pages/ModelPage';
import YearPage  from './pages/YearPage';
import MotorPage from './pages/MotorPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cars" replace />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:brand" element={<BrandPage />} />
        <Route path="/cars/:brand/:model" element={<ModelPage />} />
        <Route path="/cars/:brand/:model/:year" element={<YearPage />} />
        <Route path="/cars/:brand/:model/:year/:motor" element={<MotorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
