
import { useState, useEffect } from "react"
import { getProductRequest } from "../api/product"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Home = () => {

    const [product, setProduct] = useState([])

   const getProduct = async () => {

           try {
                    const res = await getProductRequest()
                   setProduct(res)
                 
           } catch (error) {
               console.log(error)
           }

   }

   useEffect(() => {
       getProduct()        
   }, [])
   
    return (

    <div className="min-h-screen">
        <Navbar/>
        <div className="grid grid-cols-4 gap-4 p-6" >
    
        {
            product.map((item, index) => (
            
            <div key={index} className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="px-6 py-2">
                    <h2 className="text-xl font-bold text-gray-800 uppercase dark:text-white">{item.nombres}</h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.descripcion}</p>
                </div>
                <div className="relative group">
                    <img src={item.img_product} alt="" className="object-contain w-full h-40 mt-2 group-hover:opacity-85" />
                    <div className="absolute inset-x-0 bottom-0 bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex justify-between px-4 py-2">
                            <h2 className="text-lg font-bold text-white">${item.precios}</h2>
                            <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Añadir al carro</button>
                        </div>
                    </div>
                </div>
            </div>


            ))
        }

            </div>
        <Footer/>
    </div>

  )
}

export default Home