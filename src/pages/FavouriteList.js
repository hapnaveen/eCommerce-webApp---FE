import React, { useEffect, useState } from 'react';
import ProductService from '../service/ProductService';
import ProductTable from '../components/ProductTable';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faFolderOpen, faSearch, faStar as solidStar, faStar as regularStar, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../components/DeleteModal';
const FavouritePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await ProductService.getFavoriteProducts();
        setFavorites(response.data.favouriteProducts);
        const productsData = await Promise.all(response.data.favouriteProducts.map(id => ProductService.getProductById(id)));
        setProducts(productsData.map(response => response.data));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
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

  const handleDelete = (id) => {
    setSelectedProduct(id)
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async() => {
    const remainingProducts = products.filter(product => !selectedProduct.includes(product._id));
    await ProductService.deleteProduct(selectedProduct);

    setProducts(remainingProducts);
    setSelectedProduct('');
    setIsDeleteModalOpen(false);
    alert('Product deleted successfully!');
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

  const navigateToFavourite = () => {
    navigate('/favourites');
  };

  return (
    <div className='flex justify-center min-h-screen'>
      <div className='container p-10'>
        <h1 className='text-2xl font-bold mb-5 text-left uppercase'>Favourite Products</h1>
        <div className='relative mb-5'>
          <div className="flex mx-auto justify-between">
            <div className="relative w-full">
              <div className="sm:col-span-3">
                <div className="mt-2 flex rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md relative">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search by product name or SKU"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="absolute inset-y-0 right-0 px-3 py-2 bg-primaryBlue hover:bg-primaryBlue/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-3xl text-sm inline-flex items-center text-white dark:focus:ring-[#F7BE38]/50"
                  >
                    <FontAwesomeIcon icon={faSearch} className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </div>
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
            <div className="flex items-center">
              <Button
                classNames="content-end text-white bg-primaryBlue hover:bg-primaryBlue/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
                text="New Product"
                action={handleAddNew}
              />
              <Button
                classNames="content-end text-primaryBlue bg-white border border-primaryBlue border-2 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
                icon={<FontAwesomeIcon icon={faStar} />}
                action={navigateToFavourite}
              />

            </div>
          </div>
        </div>
        <ProductTable prod={products} handleFavorite={handleFavorite} favorites={favorites} handleDelete={handleDelete} />
        <DeleteConfirmationModal isOpen={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
      </div>
    </div>


  );
};

export default FavouritePage;
