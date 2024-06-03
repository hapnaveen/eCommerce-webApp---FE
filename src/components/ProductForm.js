import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import TextField from './TextField';

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
      setSku(product.sku || '');
      setQuantity(product.quantity || '');
      setName(product.name || '');
      setDescription(product.description || '');
    }
    if (product.images) {
      const newPreviewImages = product.images.map(imagePath => {
        return `http://localhost:5000/${imagePath}`;
      });
      setPreviewImages(newPreviewImages);
    }
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
    setPreviewImages([])
    const newImages = e.target.files;
    if (newImages.length > 0) {
      setImages([...newImages]);
      const newPreviewImages = Array.from(newImages).map(image => URL.createObjectURL(image));
      console.log(newPreviewImages)
      setPreviewImages(newPreviewImages);
    } else {
      setImages([...product.images]);
      setPreviewImages([...previewImages]);
    }
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
      formData.append('thumbnailIndex', thumbnail);
    } else {
      alert("Please select a Image for the thumbnail");
      return
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

  const openFileUpload = () => {
    document.getElementById('file-upload').click();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div className='grid md:grid-cols-2 md:gap-6'>
            <div class="mt-10 relative z-0 w-full mb-5 group gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextField
                label="SKU"
                name="sku"
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
                placeholder="Enter SKU"
                autoComplete="sku"
                classNames="relative z-0 w-full mb-5 group"
              />
            </div>
            <div className='relative z-0 w-full mb-5 group'></div>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6'>
            <div class="relative z-0 w-full mb-5 group">
              <TextField
                label="Name"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter Product Name"
                autoComplete="name"
                classNames="w-full"
              />
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <TextField
                label="QTY"
                type="number"
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min={1}
                placeholder="Enter Product Quantity"
                autoComplete="quantity"
                classNames="w-full"
              />
            </div>
          </div>
          <div class="col-span-full relative z-0 w-full mb-5 group">
            <label for="description" class="block text-sm font-medium leading-6 text-primaryDarkGrey">Product Description</label>
            <p class="mt-3 text-sm leading-6 text-primaryGrey">A small description about the product</p>
            <div class="mt-2">
              <textarea id="description" name="description" rows="3" class="block w-full rounded-md border-0 py-1.5 text-primaryDarkGrey shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>

          <div class="col-span-full relative z-0 w-full mb-5 group flex flex-wrap items-center">
            <div class="flex items-center mr-2">
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-primaryDarkGrey mb-0 mr-2">Product Images</label>
              {previewImages.length > 0 && !!product._id && (
                <div className='ml-6 flex'>
                  {previewImages.map((src, index) => (
                    <img key={index} src={src} alt={`Preview ${index}`} className={'w-20 rounded-lg ml-2'} />
                  ))}
                </div>
              )}

              <span onClick={openFileUpload} class="cursor-pointer text-primaryBlue ml-6 underline">{!product._id ? 'Add Images' : 'Edit Images'}</span>
              <input id="file-upload" name="images" type="file" class="sr-only" onChange={handleImageChange} multiple />
            </div>
          </div>
          <div class="col-span-full mb-0">
            <p class="mt-3 text-sm leading-6 text-primaryGrey">JPEG, PNG, SVG, or GIF (Maximum file size 50MB)</p>
          </div>
        </div>

        {previewImages.length > 0 && (
          <div class="border-b border-gray-900/10 pb-12">
            <div className="col-span-full">
              <h2 className="text-base font-semibold leading-7 text-primaryDarkGrey">Select a cover photo</h2>
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
        <button type="button" class="text-sm font-semibold leading-6 text-primaryDarkGrey" onClick={handleCancel}>Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  );
};

export default ProductForm;
