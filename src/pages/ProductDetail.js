import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../service/ProductService';
import { Carousel } from "flowbite-react";
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBackspace } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ProductService.getProductById(id).then(response => {
            setProduct(response.data);
        });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex justify-center min-h-screen'>
            <div className='container p-10'>
                <Button
                    classNames="content-end text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
                    text="Back"
                    icon={<FontAwesomeIcon icon={faArrowLeft} />}
                    action={navigate('/')}
                />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 align-middle">
                    <div className='grid grid-cols-2 grid-flow-row gap-8'>
                        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 col-span-2 sm:col-span-1">
                            <Carousel pauseOnHover className='shadow-xl rounded-2xl'>
                                {product.images.length > 0 ? (
                                    product.images?.map((Image) => (
                                        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"><img className="h-full" src={`http://localhost:5000/${Image}`} /></div>
                                    ))) : (<div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">No Images</div>)}
                            </Carousel>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <h1 className='sm:text-3xl text-xl font-bold mt-5 mb-3 up text-center sm:text-left'>{product.name}</h1>
                            <div class="border-b border-gray-900/10 mb-5" />
                            <h1 className='text-xl mt-5 mb-3 up text-center sm:text-left'>Stock-keeping unit: {product.sku}</h1>
                            <p>Quantity: {product.quantity}</p>
                            <p>Description: {product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
