import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductForm from './components/Admin/Products/ProductForm';
import LoginForm from './components/LoginForm';
import { ToastContainer } from "react-toastify";
import Home from './pages/HomeClient';
import CategoryForm from './components/Admin/Categories/CategoryForm';
import UserForm from './components/Cliente/Registro';
import ProductList from './components/Admin/Products/ListProduct'
import UpdateForm from './components/Admin/Products/UpdateForm';
import 'react-toastify/ReactToastify.css';
import HomeAdm from './pages/HomeAdmin';
import CategoryList from './components/Admin/Categories/ListCategory';
import UpdateCategoryForm from './components/Admin/Categories/UpdateCat'
// import ProtectedRoute from './components/ProtectedRoute';
import UserList from './components/Admin/Users/ListUser';
import UpdateUser from './components/Admin/Users/UpdateUser';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm/>} />
          <Route path='/registro' element={<UserForm/>} />
          <Route path='/index' element={<Home/>} />
          <Route path='/index_adm' element={<HomeAdm/>} />
          <Route path='/crear_producto' element={<ProductForm/>}/>
          <Route path='/crear_categoria' element={<CategoryForm/>} />
          <Route path='/edit_prod' element={<ProductList/>} />
          <Route path='/edit_cat' element={<CategoryList/>} />
          <Route path='/edit_user' element={<UserList/>} />
          <Route path='/mod_user/:id' element={<UpdateUser/>} />
          <Route path='/mod_produ/:id' element={<UpdateForm/>} />
          <Route path='/mod_category/:id' element={<UpdateCategoryForm/>} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  );
}

export default App;
