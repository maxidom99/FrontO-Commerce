import { Fragment, useState } from 'react';
import { createUserRequest } from '../../api/alta_cliente';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"

const UserForm = () => {
  const [formData, setFormData] = useState({
    documento: '',
    nombre: '',
    apellido: '',
    e_mail: '',
    contrasenia: '',
    img_perfil: null,
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
      img_perfil: blobImg,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserRequest(formData);
      setFormData({
        documento: '',
        nombre: '',
        apellido: '',
        e_mail: '',
        contrasenia: '',
        img_perfil: null,
      });
      toast.success("Creacion exitosa!")
    } catch (error) {
      console.error('Error en el registro de usuario:', error);
    }
  };

  return (
    <Fragment>

    <section className="bg-white dark:bg-gray-900">
      <Link to='/index' className='absolute top-5 left-5 border px-3 py-1 rounded-md shadow-xl bg-gray-100 hover:scale-125 transition-all duration-300 delay-150'>Volver</Link>

      <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
      <h2 className='text-center font-semibold text-2xl'>Registro de usuario</h2>
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <div className="relative flex items-center mt-8">
                    <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Documento" 
                    value={formData.documento} onChange={handleInputChange} name='documento'
                    />
                </div>
                <div className="relative flex items-center mt-8">
                    <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Nombre" 
                    value={formData.nombre} onChange={handleInputChange} name='nombre'
                    />
                </div>
                <div className="relative flex items-center mt-8">
                    <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Apellido" 
                    value={formData.apellido} onChange={handleInputChange} name='apellido'
                    />
                </div>            
                <div className="relative flex items-center mt-8">
                    <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email" 
                    value={formData.e_mail} onChange={handleInputChange} name='e_mail'
                    />
                </div>                    
                <div className="relative flex items-center mt-8">
                    <input type="password" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Contraseña" 
                    value={formData.contrasenia} onChange={handleInputChange} name='contrasenia'
                    />
                </div>

              <label className="flex  items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                  <h2 className="mx-3 text-gray-400">Foto de perfil</h2>

                  <input name="img_perfil" type="file" onChange={handleFileChange}  />
              </label>

              <div className="mt-6">
                  <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-black capitalize transform  rounded-lg border shadow-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 delay-150">
                      Crear usuario
                  </button>

              </div>
        </form>
      </div>
</section>
    </Fragment>
  );
};

export default UserForm;