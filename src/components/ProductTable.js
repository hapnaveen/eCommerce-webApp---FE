import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';


const ProductTable = ({ prod, handleCheckboxChange, handleFavorite  }) => {
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

    const shouldHideCheckbox = location.pathname.includes('/search');

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {!shouldHideCheckbox && (
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                            )}

                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">SKU</th>
                            <th scope="col" className="px-6 py-3">Product name</th>
                            <th scope="col" className="px-6 py-3">Quantity</th>
                            <th scope="col" className="px-6 py-3">Created Date</th>
                            <th scope="col" className="px-6 py-3"></th>
                            {!shouldHideCheckbox && (<th scope="col" className="px-6 py-3"></th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {prod.length > 0 ? (
                            prod.map(product => (
                                <tr
                                    key={product._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                    onClick={() => handleRowClick(product._id)}
                                >
                                    {!shouldHideCheckbox && (
                                        <td className="w-4 p-4" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center">
                                                <input
                                                    id={`checkbox-table-search-${product._id}`}
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={() => handleCheckboxChange(product._id)}
                                                />
                                                <label htmlFor={`checkbox-table-search-${product._id}`} className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                    )}
                                    <td className="px-6 py-4">
                                        <img className="h-10 w-10 rounded-full" src={product.thumbnail ? `http://localhost:5000/${product.thumbnail}` : null} alt={product.name} />
                                    </td>
                                    <td className="px-6 py-4">{product.sku}</td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.name}
                                    </th>
                                    <td className="px-6 py-4">{product.quantity}</td>
                                    <td className="px-6 py-4">{formatDate(product.createdAt)}</td>
                                    <td className="px-6 py-4"  onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => handleFavorite(product)}>
                                            <FontAwesomeIcon icon={product.favorite ? solidStar : regularStar } className="text-yellow-500" />
                                        </button>
                                    </td>
                                    {!shouldHideCheckbox && (
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                            <Link to={`/update/${product._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                        </td>)}
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
        </>
    );
};

export default ProductTable;
