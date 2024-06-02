import axios from "axios";

const API_URL = '/api/products/';

class ProductService {
  getAllProducts() {
    return axios.get(API_URL);
  }

  getProductById(id) {
    return axios.get(API_URL + id);
  }

  getSearchSuggestions(query) {
    return axios.get(`${API_URL}/search/${query}`);
  }

  createProduct(productData) {
    return axios.post(API_URL, productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  updateProduct(id, productData) {
    return axios.put(API_URL + id, productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  deleteProduct(id) {
    return axios.delete(API_URL + id);
  }
}

export default new ProductService();
