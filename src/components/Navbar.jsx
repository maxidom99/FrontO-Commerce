import { useState } from 'react';
import logo from '../assets/O-COMMERCE.svg';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative bg-white shadow">
      <div className="container px-2 py-2 mx-auto flex justify-between items-center">
        <div>
          <a href="http://127.0.0.1:5173">
            <img className="w-auto h-15 sm:h-12" src={logo} alt="LOGO"/>
          </a>
        </div>

        <div className="flex lg:hidden">
          <button onClick={toggleMenu} type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="Toggle menu">
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} lg:flex flex-col lg:flex-row lg:items-center lg:justify-end lg:flex-1 my-2`}>
          <a className="text-gray-700 hover:text-blue-500 mx-5" href="http://127.0.0.1:5173">Inicio</a>
          <a className="text-gray-700 hover:text-blue-500 mx-5" href="http://127.0.0.1:5173">Productos</a>
          <a className="text-gray-700 hover:text-blue-500 mx-5" href="#">Contáctanos</a>
          <a className="text-gray-700 hover:text-blue-500 mx-5" href="#">Acerca de nosotros</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;