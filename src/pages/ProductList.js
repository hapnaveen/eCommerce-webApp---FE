import React, { useEffect, useState } from 'react';
import ProductService from '../service/ProductService';
import ProductTable from '../components/ProductTable';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faFolderOpen, faSearch, faStar as solidStar, faStar as regularStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../components/DeleteModal';
import TextField from '../components/TextField';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ProductService.getAllProducts().then(response => {
      setProducts(response.data.map(product => ({ ...product, favorite: false })));
    });
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await ProductService.getFavorites();
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
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
    alert('Product(s) deleted successfully!');
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

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    try {
      const response = await ProductService.getSearchSuggestions(value);
      setSearchSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching search suggestions', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion.name);
    setSearchSuggestions([]);
  };

  const handleSearch = () => {
    navigate(`/search?query=${searchValue}`);
  };

  const handleFavorite = (product) => {
    const isFavorite = favorites.includes(product._id);
    if (isFavorite) {
      removeFavorite(product._id);
    } else {
      addFavorite(product._id);
    }
  };

  const addFavorite = async (productId) => {
    try {
      await ProductService.addToFavorites(productId);
      setFavorites([...favorites, productId]);
      updateProductFavoriteStatus(productId, true);
    } catch (error) {
      console.error('Error adding product to favorites:', error);
    }
  };

  const removeFavorite = async (productId) => {
    try {
      await ProductService.removeFromFavorites(productId);
      setFavorites(favorites.filter(id => id !== productId));
      updateProductFavoriteStatus(productId, false);
    } catch (error) {
      console.error('Error removing product from favorites:', error);
    }
  };

  const updateProductFavoriteStatus = (productId, isFavorite) => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product._id === productId) {
          return {
            ...product,
            favorite: isFavorite
          };
        }
        return product;
      })
    );
  };

  return (
    <div className='flex justify-center min-h-screen'>
      <div className='container p-10'>
        <h1 className='text-2xl font-bold mb-5 text-center'>Products</h1>
        <div className='relative mb-5'>
          <div className="flex items-center max-w-lg mx-auto">
            <label htmlFor="voice-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <TextField
                name="search"
                id="search"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search by product name or SKU"
              />
              {searchSuggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10">
                  {searchSuggestions.map((suggestion) => (
                    <li
                      key={suggestion._id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.name} ({suggestion.sku})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button
              classNames="mt-2 content-end text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-3 inline-flex dark:focus:ring-[#F7BE38]/50 ml-2"
              icon={<FontAwesomeIcon icon={faSearch} />}
              text={<span className="hidden sm:inline">Search</span>}
              action={handleSearch}
            />
          </div>
        </div>
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
          disable={selectedProducts.length === 0}
        />
        <ProductTable prod={products} handleCheckboxChange={handleCheckboxChange} handleFavorite={handleFavorite} favorites={favorites} />
        <DeleteConfirmationModal isOpen={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
      </div>
    </div>
  );
};

export default ProductList;
