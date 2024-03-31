import { Fragment, useState } from 'react';
import { createProductRequest } from '../api/alta_producto';

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      img_product: file,
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
      alert('Producto creado exitosamente');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Fragment>
      <div className="mx-auto max-w-lg p-6 bg-red-500 rounded-md">
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-300">Creación de Productos</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input type="text" name="nombres" placeholder="Nombre del producto" value={formData.nombres} onChange={handleInputChange} className="p-2 rounded-md shadow-xl text-red-800" required />
            <input type="number" name="precios" placeholder="Precio" value={formData.precios} onChange={handleInputChange} className="p-2 rounded-md shadow-xl text-red-800" required />
            <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleInputChange} className="p-2 rounded-md shadow-xl text-red-800" required />
            <input type="text" name="id_cat" placeholder="Categoría" value={formData.id_cat} onChange={handleInputChange} className="p-2 rounded-md shadow-xl text-red-800" required />
            <input type="file" name="img_product" onChange={handleFileChange} className="p-2 rounded-md shadow-xl text-red-800" />
            <button type="submit" className="bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear Producto</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ProductForm;
