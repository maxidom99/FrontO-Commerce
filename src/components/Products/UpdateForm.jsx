import { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategoryRequest } from '../../api/category';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({ baja: 'N' });
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
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? (checked ? 'S' : 'N') : value;
        setProduct({ ...product, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos enviados al backend:', product);
        try {
            await axios.put(`http://localhost:9090/mod_produ/${id}`, product);
            toast.success("Producto actualizado");
        } catch (error) {
            console.error('Error con el producto !!:', error);
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">Nombre</label>
                                <input type="text" name="nombres" id="nombres" value={product.nombres} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div>
                                <label htmlFor="id_cat" className="block text-sm font-medium text-gray-700">Categoría</label>
                                <select id="id_cat" name="id_cat" value={selectedCategory} onChange={(e) => {
                                    handleInputChange(e);
                                    setSelectedCategory(e.target.value);
                                }} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                                <input type="text" name="descripcion" id="descripcion" value={product.descripcion} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div>
                                <label htmlFor="precios" className="block text-sm font-medium text-gray-700">Precio</label>
                                <input type="text" name="precios" id="precios" value={product.precios} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input type="checkbox" name="baja" checked={product.baja === 'S'} onChange={(e) => setProduct({ ...product, baja: e.target.checked ? 'S' : 'N' })} className="mr-2" />
                                    <span className="text-sm font-medium text-gray-700">Borrar Producto</span>
                                </label>
                            </div>

                            <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-black capitalize transform rounded-lg border shadow-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 delay-150">Guardar cambios</button>
                        </form>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default UpdateForm;
