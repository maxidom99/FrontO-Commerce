import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import ProductForm from './components/ProductForm'
import LoginForm from './components/LoginForm'
import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'
import Home from './pages/Home'
import CategoryForm from './components/CategoryForm'
import UserForm from './components/Registro'

function App() {


  return (
    <>
     <BrowserRouter>
     
     <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/index' element={<Home/>}/>
      <Route path='/crear_producto' element={<ProductForm/>}/>
      <Route path='/crear_categoria' element={<CategoryForm/>}/>
      <Route path='/registro' element={<UserForm/>}/>
     </Routes>

     <ToastContainer
      position="top-right"
      pauseOnHover={false}
      pauseOnFocusLoss={false}
    />
    
     </BrowserRouter>
    </>
  )
}

export default App