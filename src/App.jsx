import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductForm from './components/Products/ProductForm';
import LoginForm from './components/LoginForm';
import { ToastContainer } from "react-toastify";
import Home from './pages/Home';
import CategoryForm from './components/Categories/CategoryForm';
import UserForm from './components/Registro';
import ProductList from './components/Products/ListProduct'
import UpdateForm from './components/Products/UpdateForm';
import 'react-toastify/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/index' element={<Home />} />
          <Route path='/crear_producto' element={<ProductForm />} />
          <Route path='/crear_categoria' element={<CategoryForm />} />
          <Route path='/registro' element={<UserForm />} />
          <Route path='/edit_prod' element={<ProductList/>} />
          <Route path='/mod_produ/:id' element={<UpdateForm/>} />
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
