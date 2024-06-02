import React from 'react';
import ProductForm from '../components/ProductForm';
import ProductService from '../service/ProductService';

const ProductCreate = () => {
  const handleCreateProduct = (formData) => {
    ProductService.createProduct(formData).then(() => {
      alert('Product created successfully');
    }).catch(err => {
      alert('Error creating product: ' + err.message);
    });
  };

  return (
    <div>
      <h1>Create Product</h1>
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
};

export default ProductCreate;
