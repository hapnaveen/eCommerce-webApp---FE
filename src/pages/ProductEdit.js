import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import ProductService from '../service/ProductService';

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    ProductService.getProductById(id).then(response => {
      setProduct(response.data);
    });
  }, [id]);

  const handleUpdateProduct = (formData) => {
    ProductService.updateProduct(id, formData).then(() => {
      alert('Product updated successfully');
    }).catch(err => {
      alert('Error updating product: ' + err.message);
    });
  };

  return (
    <div>
      <h1>Update Product</h1>
      {product ? <ProductForm product={product} onSubmit={handleUpdateProduct} /> : <p>Loading...</p>}
    </div>
  );
};

export default ProductEdit;
