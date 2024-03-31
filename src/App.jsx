import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Home from './pages/Home'
import ProductForm from './components/ProductForm'
function App() {


  return (
    <>
     <BrowserRouter>
     
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/crear_producto' element={<ProductForm/>}/>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
