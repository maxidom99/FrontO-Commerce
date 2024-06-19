import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategoryRequest } from '../../../api/category';
import { getProductRequest } from '../../../api/product'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { useAuthStore } from '../../../auth/store';

const ProductList = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getProductRequest();
        if (productsResponse && productsResponse.length > 0) {
          setProducts(productsResponse);
          setPageCount(Math.ceil(productsResponse.length / perPage)); // Calculamos la cantidad de páginas
        // } else {
        //   console.error('No se recibieron productos en la respuesta o la propiedad data no está definida.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }

      try {
        const categoriesResponse = await getCategoryRequest();
        if (categoriesResponse && categoriesResponse.length > 0) {
          setCategories(categoriesResponse);
        } else {
          console.error('No se recibieron categorías en la respuesta o la propiedad data no está definida.');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, [id, perPage]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setOffset(selectedPage * perPage);
  };

  const handleDisableProduct = async (productId) => {
    try {
      const productToDisable = products.find(product => product.id === productId);
      const updatedProduct = { ...productToDisable, baja: 'S' };
      await axios.put(`http://localhost:8000/mod_produ/${productId}`, updatedProduct);
      const updatedProductsList = await getProductRequest();
      setProducts(updatedProductsList);
      toast.success('Producto dado de baja');
    } catch (error) {
      console.error('Error al desactivar producto:', error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category.id_cat === categoryId);
    return category ? category.nombre : 'Desconocida';
  };

  const slicedProducts = products.slice(offset, offset + perPage);
  const profile = useAuthStore((state) => state.profile)
  const Admin = profile?.rol === 'A';

  return (
    <>
        <div className="text-left mt-4 ml-4">
          <Link to='/index_adm' className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md font-semibold">Inicio</Link>
        </div>
      
      <div className="container mx-auto min-h-screen">
        <h2 className="text-center font-semibold text-2xl mt-8 mb-4">Listado de Productos</h2>
        <ul className="divide-y divide-gray-200">
          {slicedProducts.map((product) => (
            <li key={product.id} className="flex justify-between items-center py-4">
              <div>
                <strong>Nombre:</strong> {product.nombres} | <strong>Precio:</strong> {product.precios} | <strong>Descripcion:</strong> {product.descripcion} | <strong>Categoría:</strong> {getCategoryName(product.id_cat)}
              </div>
              <div className="flex items-center">
              <Link to={`/mod_produ/${product.id}`} className="bg-blue-300 hover:bg-blue-400 py-2 px-4 rounded-md mr-4 text-m">Editar</Link>
              <span className="text-black-500 font-extrabold">|</span>
              <button onClick={() => handleDisableProduct(product.id)} className="bg-red-300 hover:bg-red-400 py-2 px-4 rounded-md ml-4">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
        <ReactPaginate
  previousLabel={'<'}
  nextLabel={'>'}
  breakLabel={'...'}
  pageCount={pageCount}
  onPageChange={handlePageClick}
  containerClassName={'pagination flex justify-center mt-4'}
  activeClassName={'active'}
  pageClassName={'page bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md mr-2'}
  previousClassName={'bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md mr-2'}
  nextClassName={'bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md '}
  activeLinkClassName={'text-blue-700 bg-blue-200 hover:bg-blue-300 py-2 px-4 rounded-md mr-2'}
  disabledClassName={'disabled'}
  marginPagesDisplayed={1}
  pageRangeDisplayed={3}
  breakClassName={'break-me'}
        />
      </div>
  
    </>
  );
};

export default ProductList;
