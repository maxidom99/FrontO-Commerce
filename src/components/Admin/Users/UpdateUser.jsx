import { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ baja: 'N' });
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/user/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? (checked ? 'S' : 'N') : value;
        setUser({ ...user, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos enviados al backend:', user);
    
        try {
            const imageToBase64 = (image) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(image);
                });
            };
    
            // Si hay una nueva imagen seleccionada, la convertimos a base64
            let imgBase64 = null;
            if (selectedImage) {
                imgBase64 = await imageToBase64(selectedImage);
            }
    
            // Creamos un objeto con los datos del producto y la imagen en base64
            const updatedUser = {
                ...user,
                img_perfil: imgBase64
            };
    
            // Enviamos los datos actualizados al backend
            await axios.put(`http://localhost:9090/mod_user/${id}`, updatedUser);
            toast.success("Usuario actualizado");
        } catch (error) {
            console.error('Error con el usuario:', error);
            toast.error("Hubo un error al actualizar el usuario");
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <Fragment>
            <section className="bg-gray-200 min-h-screen">
                <Link to='/edit_prod' className='absolute top-5 left-5 border px-3 py-1 rounded-md shadow-xl bg-gray-100 hover:scale-125 transition-all duration-300 delay-150'>Volver</Link>

                <div className="container flex flex-col items-center justify-center px-6 mx-auto">
                    <h2 className='text-center font-semibold text-2xl mb-4'>Actualización de Usuarios</h2>
                    <div className="bg-white rounded-lg p-8 w-full max-w-xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 text-center underline">Nombre</label>
                                <input type="text" name="nombre" id="nombre" value={user.nombre} onChange={handleInputChange} className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-m sm:text-s border-gray-300 rounded-md" />
                            </div>

                            <div>
                                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 text-center underline">Apellido</label>
                                <input type="text" name="apellido" id="apellido" value={user.apellido} onChange={handleInputChange} className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-s border-gray-300 rounded-md" />
                            </div>

                            <div>
                                <label htmlFor="e_mail" className="block text-sm font-medium text-gray-700 text-center underline">E-mail</label>
                                <input type="email" name="e_mail" id="e_mail" value={user.e_mail} onChange={handleInputChange} className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-s border-gray-300 rounded-md" />
                            </div>

                            <div>
                                <label htmlFor="img_perfil" className="block text-sm font-medium text-gray-700 text-center underline">Nueva Imagen</label>
                                <input type="file" name="img_perfil" id="img_perfil" onChange={(e) => setSelectedImage(e.target.files[0])} accept="image/*" className="ml-24 mt-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div>
                                <label htmlFor="img_perfil" className="block text-sm font-medium text-gray-700 text-center underline">Imagen actual del Usuario</label>
                                {user.img_perfil && <img src={user.img_perfil} alt="Imagen actual del Usuario" className="mt-2 w-full h-auto border-2 border-black border-solid rounded-md" />}
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input type="checkbox" name="baja" checked={user.baja === 'S'} onChange={(e) => setUser({ ...user, baja: e.target.checked ? 'S' : 'N' })} className="ml-48" />
                                    <span className="ml-2 text-sm font-medium text-gray-700 underline">Borrar Producto</span>
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

export default UpdateUser;
