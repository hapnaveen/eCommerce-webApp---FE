import React, { useState, useEffect } from 'react';
import ProductService from '../service/ProductService';
import ProductTable from '../components/ProductTable';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        console.log(searchValue)
        const response = await ProductService.getSearchSuggestions(searchValue);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    };
    fetchSearchResults();
  }, [searchValue]);

  return (
    <div className='container p-10'>
      <h1 className='text-2xl font-bold mb-5 text-center'>Search Results</h1>
      {console.log(searchResults)}
      <ProductTable prod={searchResults} />
    </div>
  );
};

export default SearchResults;
