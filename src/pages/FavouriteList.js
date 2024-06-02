import React, { useState, useEffect } from 'react';
import ProductService from '../service/ProductService';
import ProductTable from '../components/ProductTable';
import { useLocation, useNavigate } from 'react-router-dom';

const FavoritePage = () => {
    const [favouriteProducts, setFavouriteProducts] = useState([]);
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const navigate = useNavigate();
    const location = useLocation();

    const handleRowClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    useEffect(() => {
        const getFavoriteProducts = async () => {
            ProductService.getFavoriteProducts()
                .then(response => {
                    setFavouriteProducts(response.data)
                })
                .catch(err => console.error('Error fetching product:', err));
        };
        getFavoriteProducts();
    }, []);

    return (
        <div className='flex justify-center min-h-screen'>
            <div className='container p-10'>
                <h1 className='text-2xl font-bold mb-5 text-center'>Favourite Products</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3">SKU</th>
                                <th scope="col" className="px-6 py-3">Product name</th>
                                <th scope="col" className="px-6 py-3">Quantity</th>
                                <th scope="col" className="px-6 py-3">Created Date</th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {favouriteProducts.length > 0 ? (
                                favouriteProducts.map(product => (
                                    <tr
                                        key={product._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                        onClick={() => handleRowClick(product._id)}
                                    >
                                        <td className="px-6 py-4">
                                            <img className="h-10 w-10 rounded-full" src={product.thumbnail ? `http://localhost:5000/${product.thumbnail}` : null} alt={product.name} />
                                        </td>
                                        <td className="px-6 py-4">{product.sku}</td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.name}
                                        </th>
                                        <td className="px-6 py-4">{product.quantity}</td>
                                        <td className="px-6 py-4">{formatDate(product.createdAt)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FavoritePage;
