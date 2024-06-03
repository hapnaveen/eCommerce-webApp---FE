import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import ProductService from '../service/ProductService';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const ProductCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    if (id) {
      ProductService.getProductById(id)
        .then(response => {
          setProduct(response.data)
        })
        .catch(err => console.error('Error fetching product:', err));
    }
  }, [id]);

  const handleProductSubmit = (formData) => {
    if (id) {
      ProductService.updateProduct(id, formData)
        .then(() => {
          alert('Product updated successfully');
          navigate('/');
        })
        .catch(err => {
          alert('Error updating product: ' + err.message);
        });
    } else {
      ProductService.createProduct(formData)
        .then(() => {
          alert('Product created successfully');
          navigate('/');
        })
        .catch(err => {
          alert('Error creating product: ' + err.message);
        });
    }
  };

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className='flex justify-center min-h-screen'>
      <div className='container p-10'>
        <div className='relative mb-5'>
          <div className="flex items-center">
            <h1 className='text-2xl font-bold text-left uppercase mr-3 cursor-pointer' onClick={handleBack}>Products</h1>
            <FontAwesomeIcon icon={faChevronRight} className="h-5 w-4 mr-1" />
            <span className='text-md text-primaryBlue ml-3'>{id ? 'Edit Product' : 'Create Product'}</span>
          </div>
        </div>
        <ProductForm product={product} onSubmit={handleProductSubmit} />
      </div>
    </div>
  );
};

export default ProductCreate;
