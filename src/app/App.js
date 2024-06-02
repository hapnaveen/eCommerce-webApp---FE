import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import ProductCreate from '../pages/ProductCreate';
import ProductEdit from '../pages/ProductEdit';

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<ProductCreate />} />
          <Route path="/update/:id" element={<ProductEdit />} />
      </Routes>
  );
};

export default App;