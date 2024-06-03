import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const ProductTable = ({ prod, handleFavorite, favorites, handleDelete }) => {
    const [favouriteProd, setFavouriteProd] = useState([]);
    const navigate = useNavigate();

    const handleRowClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const isFavorite = (productId) => {
        return favouriteProd.includes(productId);
    };

    useEffect(() => {
        setFavouriteProd(favorites)
    },[favorites])

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-primaryBlue">SKU</th>
                            <th scope="col" className="px-6 py-3 text-primaryBlue">Image</th>
                            <th scope="col" className="px-6 py-3 text-primaryBlue">Product name</th>
                            <th scope="col" className="px-6 py-3 text-primaryBlue">Quantity</th>
                            <th scope="col" className="px-6 py-3 text-primaryBlue"></th>
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
                                    <td className="px-6 py-4">{product.sku}</td>
                                    <td className="px-6 py-4">
                                        <img className="h-10 w-10 rounded-md" src={product.thumbnail ? `http://localhost:5000/${product.thumbnail}` : null} alt={product.name} />
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.name}
                                    </th>
                                    <td className="px-6 py-4">{product.quantity}</td>
                                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                        <FontAwesomeIcon icon={faTrash} className="text-primaryBlue pl-2" onClick={() => handleDelete(product._id)} />
                                        <Link to={`/update/${product._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <FontAwesomeIcon icon={faEdit} className="text-primaryBlue pl-2" />
                                        </Link>
                                        <button onClick={() => handleFavorite(product)}>
                                            <FontAwesomeIcon icon={isFavorite(product._id) ? solidStar : regularStar} className="text-primaryBlue pl-2" />
                                        </button>
                                    </td>
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
