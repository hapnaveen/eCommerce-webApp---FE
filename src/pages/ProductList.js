import React, { useEffect, useState } from 'react';
import ProductService from '../service/ProductService';
import ProductTable from '../components/ProductTable';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ProductService.getAllProducts().then(response => {
      setProducts(response.data);
    });
  }, []);

  const handleAddNew = () => {
    navigate('/create');
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='container p-10'>
        <h1 className='text-2xl font-bold mb-5 text-center'>Products</h1>
        <Button
          classNames="content-end text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
          text="Add New"
          icon={<FontAwesomeIcon icon={faFolderOpen} />}
          action={handleAddNew}
        />
        <ProductTable prod={products} />
        <ul>
          {products.map(product => (
            <li key={product._id} className='mb-5 text-center'>
              <h2 className='text-xl font-semibold'>{product.name}</h2>
              <p>{product.description}</p>
              <p>Quantity: {product.quantity}</p>
              <p>SKU: {product.sku}</p>
              <div className='flex justify-center space-x-2'>
                {product.images.map((image, index) => (
                  <img key={index} src={`/${image}`} alt={product.name} className='w-24' />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
