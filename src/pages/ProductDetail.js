import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../service/ProductService';
import { Carousel } from "flowbite-react";
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash, faStar, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationModal from '../components/DeleteModal';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        ProductService.getProductById(id).then(response => {
            setProduct(response.data);
        });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleBack = () => {
        navigate('/')
    }

    const handleEdit = () => {
        navigate(`/update/${id}`);
    }

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        await ProductService.deleteProduct(id)
        setIsDeleteModalOpen(false);
        alert('Product deleted successfully!');
        navigate('/')
    };

    return (
        <div className='flex justify-center min-h-screen'>
            <div className='container p-10'>
                <div className='relative mb-5'>
                    <div className="flex items-center">
                        <h1 className='text-2xl font-bold text-left uppercase mr-3 cursor-pointer' onClick={handleBack}>Products</h1>
                        <FontAwesomeIcon icon={faChevronRight} className="h-5 w-4 mr-1" />
                        <span className='text-md text-primaryBlue ml-3'>{product.name}</span>
                    </div>
                </div>
                <div className='relative mb-5'>
                    <div className="flex mx-auto justify-between">
                        <div className="relative w-full">
                            <div className='bg-white p-10 w-full'>
                                <div className="relative overflow-hidden shadow-md sm:rounded-lg align-middle">
                                    <div className='grid grid-cols-2 grid-flow-row gap-8'>
                                        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 col-span-2 sm:col-span-1 flex items-center justify-center">
                                            <div className="w-full h-full overflow-hidden">
                                                <Carousel pauseOnHover className='shadow-xl rounded-2xl'>
                                                    {product.images.length > 0 ? (
                                                        product.images?.map((Image) => (
                                                            <div key={Image} className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                                                                <img className="h-full w-full object-cover" src={`http://localhost:5000/${Image}`} alt="Product" />
                                                            </div>
                                                        ))) : (
                                                        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                                                            No Images
                                                        </div>
                                                    )}
                                                </Carousel>
                                            </div>
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <h1 className='sm:text-3xl text-xl font-bold mt-5 mb-3 text-center sm:text-left'>{product.name}</h1>
                                            <div className="border-b border-gray-900/10 mb-5" />
                                            <h1 className='text-lg mt-5 mb-3 text-center sm:text-left'>Stock-keeping unit: {product.sku}</h1>
                                            <p>Quantity: {product.quantity}</p>
                                            <p>Description: {product.description}</p>
                                            <div className="mt-5 flex space-x-3">
                                                <Button
                                                    classNames="bg-blue-500 hover:bg-blue-600 text-white focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex dark:focus:ring-[#F7BE38]/50"
                                                    text="Edit"
                                                    icon={<FontAwesomeIcon icon={faEdit} />}
                                                    action={handleEdit}
                                                />
                                                <Button
                                                    classNames="bg-red-500 hover:bg-red-600 text-white focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex dark:focus:ring-[#F7BE38]/50"
                                                    text="Delete"
                                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                                    action={handleDelete}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
