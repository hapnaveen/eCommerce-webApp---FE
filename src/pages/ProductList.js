import React, { useEffect, useState } from 'react';
import ProductService from '../service/ProductService';
import ProductTable from '../components/ProductTable';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../components/DeleteModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  useEffect(() => {
    ProductService.getAllProducts().then(response => {
      setProducts(response.data);
    });
  }, []);

  const handleAddNew = () => {
    navigate('/create');
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const remainingProducts = products.filter(product => !selectedProducts.includes(product._id));
    selectedProducts.forEach(async productId => {
      await ProductService.deleteProduct(productId);
    });

    setProducts(remainingProducts);
    setSelectedProducts([]);
    setIsDeleteModalOpen(false);
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts(prevSelected => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  useEffect(() => {
    if (selectedProducts.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [selectedProducts])

  return (
    <div className='flex justify-center min-h-screen'>
      <div className='container p-10'>
        <h1 className='text-2xl font-bold mb-5 text-center'>Products</h1>
        <Button
          classNames="content-end text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
          text="Add New"
          icon={<FontAwesomeIcon icon={faFolderOpen} />}
          action={handleAddNew}
        />
        <Button
          classNames="content-end text-gray-900 bg-red-500 hover:bg-red-500/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
          text="Delete"
          icon={<FontAwesomeIcon icon={faDeleteLeft} />}
          action={handleDelete}
          disable={disabled}
        />
        <ProductTable prod={products} handleCheckboxChange={handleCheckboxChange} />
        <DeleteConfirmationModal isOpen={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
      </div>
    </div>
  );
};

export default ProductList;
