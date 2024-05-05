import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategoryRequest } from '../../../api/category';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const CategoryList = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Inicializa useNavigate
  const [category, setCategory] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getCategoryRequest();
        if (categoriesResponse && categoriesResponse.length > 0) {
          setCategory(categoriesResponse);
          setPageCount(Math.ceil(categoriesResponse.length / perPage));
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

  const handleDisableCategory = async (categoryId) => {
    try {
      const categoryToDisable = category.find(category => category.id_cat === categoryId);
      const updatedCategory = { ...categoryToDisable, baja: 'S' };
      await axios.put(`http://localhost:9090/mod_category/${categoryId}`, updatedCategory);
      const updatedCategoryList = await getCategoryRequest();
      setCategory(updatedCategoryList);
      toast.success('Categoría dada de baja');
    } catch (error) {
      console.error('Error al desactivar categoría:', error);
    }
  };

  const slicedCategory = category.slice(offset, offset + perPage);

  return (
    <>
      <div className="text-left mt-4 ml-4">
        <Link to='/index_adm' className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md font-semibold">Inicio</Link>
      </div>
      <div className="container mx-auto">
        <h2 className="text-center font-semibold text-2xl mt-8 mb-4">Listado de Categorías</h2>
        <ul className="divide-y divide-gray-200">
          {slicedCategory.map((categoryItem) => (
            <li key={categoryItem.id_cat} className="flex justify-between items-center py-4">
              <div>
                <strong>Nombre:</strong> {categoryItem.nombre}
              </div>
              <div className="flex items-center">
                {/* Verifica si categoryItem.id tiene un valor válido antes de mostrar el botón */}
                {categoryItem.id_cat !== undefined && (
                  <button onClick={() => navigate(`/mod_category/${categoryItem.id_cat}`)} className="bg-blue-300 hover:bg-blue-400 py-2 px-4 rounded-md mr-4 text-m">Editar</button>
                )}
                <span className="text-black-500 font-extrabold">|</span>
                <button onClick={() => handleDisableCategory(categoryItem.id)} className="bg-red-300 hover:bg-red-400 py-2 px-4 rounded-md ml-4">Eliminar</button>
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

export default CategoryList;
