import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ product = {}, onSubmit }) => {
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (images.length > 0) {
      const newPreviewImages = Array.from(images).map(image => URL.createObjectURL(image));
      setPreviewImages(newPreviewImages);
    }
  }, [images]);

  useEffect(() => {
    if (product) {
      setSku(product.sku);
      setQuantity(product.quantity);
      setName(product.name);
      setDescription(product.description);
    }
    // if (product.images) {
    //   const newPreviewImages = product.images.map(imagePath => {
    //     return `http://localhost:5000/${imagePath}`;
    //   });
    //   setPreviewImages(newPreviewImages);
    // }
  }, [product]);

  useEffect(() => {
    let allImages = [];
    if (Array.isArray(product.images)) {
      allImages = [...product.images];
    }
    allImages = [...allImages, ...images];
    const newPreviewImages = allImages.map((image, index) => {
      if (typeof image === 'string') {
        return `http://localhost:5000/${image}`;
      } else {
        return URL.createObjectURL(image);
      }
    });
    setPreviewImages(newPreviewImages);
  }, [product.images, images]);


  const handleImageChange = (e) => {
    const newImages = e.target.files;
    setImages([...images, ...newImages]);
  };

  const handleThumbnailChange = (index) => {
    setThumbnail(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('sku', sku);
    formData.append('quantity', quantity);
    formData.append('name', name);
    formData.append('description', description);
    if (!product._id) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }
    if (thumbnail !== null) {
      formData.append('thumbnailIndex', thumbnail); // Changed to index
    }
    onSubmit(formData);
  };

  const handleCancel = () => {
    setSku('')
    setQuantity('')
    setName('')
    setDescription('')
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">SKU</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="text" name="sku" id="sku" autocomplete="sku" class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter SKU" value={sku} onChange={(e) => setSku(e.target.value)} required />
                </div>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="text" name="name" id="name" autocomplete="name" class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="quantity" class="block text-sm font-medium leading-6 text-gray-900">Product Quantity</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="number" min={1} name="quantity" id="quantity" autocomplete="quantity" class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter Product Qunatity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
              </div>
            </div>
            <div class="col-span-full">
              <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div class="mt-2">
                <textarea id="description" name="description" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">Description on the product.</p>
            </div>

            <div class="col-span-full">
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Product Photos</label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div class="text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                  </svg>
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a files</span>
                      <input id="file-upload" name="images" type="file" class="sr-only" onChange={handleImageChange} multiple disabled={!!product._id} />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {previewImages.length > 0 && (
          <div class="border-b border-gray-900/10 pb-12">
            <div className="col-span-full">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Select a cover photo</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative">
                    <img src={src} alt={`Preview ${index}`} className={`w-full h-auto border ${thumbnail === index ? 'border-indigo-600' : 'border-gray-300'}`} onClick={() => handleThumbnailChange(index)} />
                    {thumbnail === index && (
                      <div className="absolute inset-0 bg-indigo-600 bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Thumbnail</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900" onClick={handleCancel}>Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  );
};

export default ProductForm;
