import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';



// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const Search = lazy(() => import('./pages/Search'));
const Watch = lazy(() => import('./pages/Watch'));
const Trending = lazy(() => import('./pages/Trending'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="category/:categoryId" element={<Category />} />
        <Route path="search" element={<Search />} />
        <Route path="trending" element={<Trending />} />
        <Route path="movie/:id" element={<MovieDetails />} />
      </Route>
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
