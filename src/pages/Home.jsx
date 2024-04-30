import { useState, useEffect } from "react"
import { getProductRequest } from "../api/product"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { MdAddShoppingCart } from "react-icons/md";

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
<>
    <div className="min-h-screen">
        <Navbar/>
        <div className="w-9/12 mb-24 m-auto">

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3" >
    
        {
            product.map((item, index) => (
            
                <div class="flex flex-col items-center p-4 shadow-xl border sm:p-6 rounded-xl dark:border-gray-700">
                <img class="object-cover w-full rounded-xl aspect-square" src={item.img_product} alt=""/>

                <h1 class="mt-4 text-2xl font-semibold text-gray-700  dark:text-white">{item.nombres}</h1>

                <p class="mt-2 text-gray-500  dark:text-gray-300">{item.descripcion}</p>

                <div class="flex flex-col mt-4">
            <p className="text-black text-center font-semibold
             text-2xl">$ {item.precios}</p>
          
                </div>  <button className="border w-full text-2xl font-semibold bg-zinc-800 shadow-xl text-white rounded-md h-12 mt-2 flex items-center justify-center gap-4 hover:scale-110 transition-all delay-150 duration-300"><span className="mt-2 text-3xl"><MdAddShoppingCart /></span>Comprar</button>
            </div>



            ))
        }

            </div>
            </div>
    </div>
      <Footer/>
 </>
  )
}

export default Home

