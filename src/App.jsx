import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Home from './pages/Home'
import ProductForm from './components/ProductForm'
import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'

function App() {


  return (
    <>
     <BrowserRouter>
     
     <Routes>
      <Route path='/' element={<Home/>}/>
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
