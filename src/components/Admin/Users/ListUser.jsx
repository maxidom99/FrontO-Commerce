import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserRequest } from '../../../api/users';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { useAuthStore } from '../../../auth/store';

const UserList = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await getUserRequest();
        if (usersResponse && usersResponse.length > 0) {
          setUsers(usersResponse);
          setPageCount(Math.ceil(usersResponse.length / perPage)); // Calculamos la cantidad de páginas
        } else {
          console.error('No se recibieron usuarios en la respuesta o la propiedad data no está definida.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [id, perPage]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setOffset(selectedPage * perPage);
  };

  const handleDisableUser = async (userId) => {
    try {
      const userToDisable = users.find(users => users.id === userId);
      const updatedUser = { ...userToDisable, baja: 'S' };
      await axios.put(`http://localhost:9090/mod_user/${userId}`, updatedUser);
      const updatedUsersList = await getUserRequest();
      setUsers(updatedUsersList);
      toast.success('Usuario dado de baja');
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
    }
  };

  const slicedUsers = users.slice(offset, offset + perPage);
  const profile = useAuthStore((state) => state.profile)
  const Admin = profile?.rol === 'A';

  return (
    <>
        <div className="text-left mt-4 ml-4">
          <Link to='/index_adm' className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md font-semibold">Inicio</Link>
        </div>
        {Admin &&
      <div className="container mx-auto">
        <h2 className="text-center font-semibold text-2xl mt-8 mb-4">Listado de Productos</h2>
        <ul className="divide-y divide-gray-200">
          {slicedUsers.map((users) => (
            <li key={users.id} className="flex justify-between items-center py-4">
              <div>
                <strong>Nombre:</strong> {users.nombre} | <strong>Apellido:</strong> {users.apellido} | <strong>E-mail:</strong> {users.e_mail} | <strong>Usuario bloqueado: </strong> {users.baja}
              </div>
              <div className="flex items-center">
              <Link to={`/mod_user/${users.id}`} className="bg-blue-300 hover:bg-blue-400 py-2 px-4 rounded-md mr-4 text-m">Editar</Link>
              <span className="text-black-500 font-extrabold">|</span>
              <button onClick={() => handleDisableUser(users.id)} className="bg-red-300 hover:bg-red-400 py-2 px-4 rounded-md ml-4">Eliminar</button>
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
  }
    </>
  );
};

export default UserList;
