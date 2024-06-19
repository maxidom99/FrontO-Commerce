import { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCategoryForm = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/categorias/${id}`);
                setCategory(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? (checked ? 'S' : 'N') : value;
        setCategory({ ...category, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imgBase64 = null;
            if (selectedImage) {
                imgBase64 = await imageToBase64(selectedImage);
            }

            const updatedCategory = {
                ...category,
                img_category: imgBase64
            };

            await axios.put(`http://localhost:8000/mod_category/${id}`, updatedCategory);
            toast.success("Categoría actualizada correctamente");
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error("Hubo un error al actualizar la categoría");
        }
    };

    const imageToBase64 = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(image);
        });
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <Fragment>
            <section className="bg-gray-200 min-h-screen">
                <Link to='/edit_cat' className='absolute top-5 left-5 border px-3 py-1 rounded-md shadow-xl bg-gray-100 hover:scale-125 transition-all duration-300 delay-150'>Volver</Link>

                <div className="container flex flex-col items-center justify-center px-6 mx-auto">
                    <h2 className='text-center font-semibold text-2xl mb-4'>Actualización de Categoría</h2>
                    <div className="bg-white rounded-lg p-8 w-full max-w-xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 text-center underline">Nombre de la Categoría</label>
                                <input type="text" name="nombre" id="nombre" value={category.nombre} onChange={handleInputChange} className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-m sm:text-s border-gray-300 rounded-md" />
                            </div>

                            {/* Muestra la imagen actual si está disponible */}
                            {category.img_category && (
                                <div>
                                    <label htmlFor="img_category" className="block text-sm font-medium text-gray-700 text-center underline">Imagen de la Categoría</label>
                                    <img src={category.img_category} alt="Imagen de la Categoría" className="mt-2 w-full h-auto border-2 border-black border-solid rounded-md" />
                                </div>
                            )}

                            <div>
                                <label htmlFor="img_category" className="block text-sm font-medium text-gray-700 text-center underline">Nueva Imagen de la Categoría</label>
                                <input type="file" name="img_category" id="img_category" onChange={(e) => setSelectedImage(e.target.files[0])} accept="image/*" className="ml-24 mt-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input type="checkbox" name="baja" checked={category.baja === 'S'} onChange={handleInputChange} className="ml-48" />
                                    <span className="ml-2 text-sm font-medium text-gray-700 underline">Deshabilitar Categoría</span>
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

export default UpdateCategoryForm;
