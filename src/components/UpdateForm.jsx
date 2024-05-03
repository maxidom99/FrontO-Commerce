import { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategoryRequest } from '../api/category';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({ baja: 'N', img_product: null });
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/productos/${id}`);
                setProduct(response.data);
                setSelectedCategory(response.data.id_cat);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const categories = await getCategoryRequest();
                setCategories(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        const newValue = name === 'img_product' ? files[0] : value;
        setProduct({ ...product, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            formData.append(key, value);
        });
        try {
            await axios.put(`http://localhost:9090/mod_produ/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success("Producto actualizado");
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error("Hubo un error al actualizar el producto");
        }
    };

    if (loading || categories.length === 0) {
        return <p>Cargando...</p>;
    }

    return (
        <Fragment>
            <section className="bg-gray-200 min-h-screen">
                <Link to='/edit_prod' className='absolute top-5 left-5 border px-3 py-1 rounded-md shadow-xl bg-gray-100 hover:scale-125 transition-all duration-300 delay-150'>Volver</Link>

                <div className="container flex flex-col items-center justify-center px-6 mx-auto">
                    <h2 className='text-center font-semibold text-2xl mb-4'>Actualización de Productos</h2>
                    <div className="bg-white rounded-lg p-8 w-full max-w-xl">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="nombres" className="block font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre:</label>
                                <input type="text" id="nombres" name="nombres" value={product.nombres} placeholder="Nombre" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={handleInputChange} />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="id_cat" className="block font-medium text-gray-700 dark:text-gray-300 mb-2">Categoría:</label>
                                <select id="id_cat" name="id_cat" value={selectedCategory} onChange={(e) => {
                                    handleInputChange(e);
                                    setSelectedCategory(e.target.value);
                                }} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="img_product" className="block font-medium text-gray-700 dark:text-gray-300 mb-2">Imagen:</label>
                                <input type="file" id="img_product" name="img_product" accept="image/*" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={handleInputChange} />
                                {product.img_product && (
                                    <img src={typeof product.img_product === 'string' ? product.img_product : URL.createObjectURL(product.img_product)} alt="Imagen del producto" className="w-full h-auto mx-auto mt-2" />
                                )}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="descripcion" className="block font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción:</label>
                                <input type="text" id="descripcion" name="descripcion" value={product.descripcion} placeholder="Descripción" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={handleInputChange} />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="precios" className="block font-medium text-gray-700 dark:text-gray-300 mb-2">Precio:</label>
                                <input type="text" id="precios" name="precios" value={product.precios} placeholder="Precio" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={handleInputChange} />
                            </div>

                            <div className="mb-6">
                                <input type="checkbox" id="baja" name="baja" checked={product.baja === 'S'} onChange={(e) => setProduct({ ...product, baja: e.target.checked ? 'S' : 'N' })} className="mr-2" />
                                <label htmlFor="baja" className="text-gray-700 dark:text-gray-300">Borrar Producto</label>
                            </div>

                            <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-black capitalize transform rounded-lg border shadow-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 delay-150">
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default UpdateForm;
