import { Fragment, useState } from 'react';
import { loginRequest } from '../api/login';
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuthStore } from '../auth/store';

 
const LoginForm = () => {
  const [formData, setFormData] = useState({
    e_mail: '',
    contrasenia: '',
  });
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const setProfile = useAuthStore(state => state.setProfile)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await loginRequest(formData);
      setProfile(res[0])
      setFormData({
        e_mail: '',
        contrasenia: '',
      });
      toast.success("Logueado exitosamente!");
      setRedirectToHome(res[0]?.rol === 'A' ? '/index_adm' : '/index');
      
    } catch (error) {
      console.error('La contraseña o el email son incorrectos:', error);
    }
  };

  if (redirectToHome) {
    return <Navigate to={redirectToHome} replace />;
  }

  return (
    <Fragment>
  
        <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
          <h2 className='text-center font-semibold text-2xl'>O-Commerce</h2>
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="relative flex items-center mt-8">
              <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email"
                value={formData.e_mail} onChange={handleInputChange} name='e_mail'
              />
            </div>

            <div className="relative flex items-center mt-6">
              <input type="password" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Contraseña"
                value={formData.contrasenia} onChange={handleInputChange} name='contrasenia'
              />
            </div>

            <div className="mt-6">
              <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-black capitalize transform  rounded-lg border shadow-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 delay-150">
                Iniciar sesión
              </button>
            </div>
          </form>
          <br/>
          <p>No estoy registrado pero quiero</p>
          <a className="text-blue-400 hover:text-blue-600 mx-5 no-underline hover:underline" href="http://127.0.0.1:5173/registro">crearme una cuenta</a>
        </div>

    </Fragment>

  );
};
export default LoginForm;
