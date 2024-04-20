
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
        <Footer/>
        <div className="grid grid-cols-2 gap-8 p-4" >
    

        {
            product.map((item, index) => (

                <div key={index} className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="px-4 py-2">
                    <h2 className="text-xl font-bold text-gray-800 uppercase dark:text-white">{item.nombres}</h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.descripcion}</p>
                    </div>
                        <img src={item.img_product} alt="" className="object-cover w-full h-40 mt-2"/>
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                        <h2 className="text-lg font-bold text-white">${item.precios}</h2>
                        <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Añadir al carro</button>
                        </div> 
            </div>

            ))
        }

            </div>
    </div>

  )
}

export default Home