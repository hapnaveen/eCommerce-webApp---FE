import axios from "axios";

const PROD_API_URL = '/api/products/';
const FAV_API_URL = '/api/favourites/';

class ProductService {
  getAllProducts() {
    return axios.get(PROD_API_URL);
  }

  getProductById(id) {
    return axios.get(PROD_API_URL + id);
  }

  getSearchSuggestions(query) {
    return axios.get(`${PROD_API_URL}/search/${query}`);
  }

  createProduct(productData) {
    return axios.post(PROD_API_URL, productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  updateProduct(id, productData) {
    return axios.put(PROD_API_URL + id, productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  deleteProduct(id) {
    return axios.delete(PROD_API_URL + id);
  }

  addToFavorites(productId) {
    return axios.post(`${FAV_API_URL}add`, { productId });
  }

  removeFromFavorites(productId) {
    return axios.post(`${FAV_API_URL}remove`, { productId });
  }

  getFavoriteProducts() {
    return axios.get(FAV_API_URL);
  }
}

export default new ProductService();
