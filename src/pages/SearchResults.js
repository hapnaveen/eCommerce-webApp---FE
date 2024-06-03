import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ProductService from '../service/ProductService';
import ProductTable from '../components/ProductTable';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await ProductService.getSearchSuggestions(searchValue);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results', error);
            }
        };
        fetchSearchResults();
    }, [searchValue]);

    return (
        <div className='flex justify-center min-h-screen'>
            <div className='container p-14'>
                <h1 className='text-2xl font-bold mb-5 text-left uppercase'>Products</h1>
                {searchResults.map((prod) => (
                    <div className='relative mb-5' key={prod._id}> {/* Add key prop */}
                        <Link to={`/product/${prod._id}`} className="block">
                            <div className="flex items-center sm:px-36 pb-3">
                                <div className="flex-grow">
                                    <p className="text-primaryBlue text-md py-1">{prod.sku}</p>
                                    <p className="text-primaryDarkGrey text-xl py-1">{prod.name}</p>
                                    <p className="text-primaryGrey text-xs py-2">{prod.description}</p>
                                </div>
                                <FontAwesomeIcon icon={faChevronRight} className="h-10 w-4 mr-1" />
                            </div>
                        </Link>
                        <div className="border-b border-primaryGrey sm:mx-16"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
