import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductRequest } from '../../api/product';


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductRequest();
        //console.log('Fetched Products:', response);
        if (response && response.length > 0) {
          setProducts(response);
        } else {
          console.error('No se recibieron productos en la respuesta o la propiedad data no está definida.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <>

      <div className="container mx-auto">
        <h2 className="text-center font-semibold text-2xl mt-8 mb-4">Listado de Productos</h2>
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between items-center py-4">
              <div>
                <strong>Nombre:</strong> {product.nombres} | <strong>Precio:</strong> {product.precios} | <strong>Descripcion:</strong> {product.descripcion}
              </div>
              <Link to={`/mod_produ/${product.id}`} className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md">Editar</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center mt-4">
        <Link to='/index' className="text-blue-400 hover:text-blue-600 no-underline hover:underline">Inicio</Link>
      </div>

    </>
  );
};

export default ProductList;
