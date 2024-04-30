import { Fragment, useState } from 'react';
import { createProductRequest } from '../api/alta_producto';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"

const ProductForm = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    descripcion: '',
    precios: '',
    id_cat: '',
    img_product: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  };


  const handleFileChange = async(e) => {
    
    const file = e.target.files[0];
    const blobImg = await readFileAsBase64(file)
    setFormData({
      ...formData,
      img_product: blobImg,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProductRequest(formData);
      setFormData({
        nombres: '',
        descripcion: '',
        precios: '',
        id_cat: '',
        img_product: null,
      });
      toast.success("Creacion exitosa!")
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Fragment>
  <section className="bg-white dark:bg-gray-900">
    <Link to='/' className='absolute top-5 left-5 border px-3 py-1 rounded-md shadow-xl bg-gray-100 hover:scale-125 transition-all duration-300 delay-150'>Volver</Link>

    <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
    <h2 className='text-center font-semibold text-2xl'>Creación de Productos</h2>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="relative flex items-center mt-8">
                <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Nombres" 
                value={formData.nombres} onChange={handleInputChange} name='nombres'
                />
            </div>

            <label className="flex  items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                <h2 className="mx-3 text-gray-400">Imagen</h2>

                <input name="img_product" type="file" onChange={handleFileChange}  />
            </label>

            <div className="relative flex items-center mt-6">

                <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Descripción"
                value={formData.descripcion} onChange={handleInputChange} name='descripcion'
                />
            </div>
            <div className="relative flex items-center mt-6">
            <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Precios"
                value={formData.precios} onChange={handleInputChange} name='precios'
                      />
              </div>
              <div className="relative flex items-center mt-6">
              <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Categoría"
              value={formData.id_cat} name='id_cat' onChange={handleInputChange} 
                  />
                </div>
            <div className="mt-6">
                <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-black capitalize transform  rounded-lg border shadow-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 delay-150">
                    Crear producto
                </button>

            </div>
        </form>
    </div>
</section>
    </Fragment>
  );
};

export default ProductForm;
