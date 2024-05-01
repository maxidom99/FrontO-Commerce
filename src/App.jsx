import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import ProductForm from './components/ProductForm'
import LoginForm from './components/LoginForm'
import Categorias from './components/Catalogo'
import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'
import Productos from './components/Productos'

function App() {


  return (
    <>
     <BrowserRouter>
     
     <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/index' element={<Categorias/>}/>
      <Route path='/index' element={<Productos/>}/>
      <Route path='/crear_producto' element={<ProductForm/>}/>

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
