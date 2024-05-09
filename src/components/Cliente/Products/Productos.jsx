import { useState, useEffect, useContext } from "react"
import { getProductRequest } from "../../../api/product"
import { MdAddShoppingCart } from "react-icons/md";
import { useAuthStore } from "../../../auth/store";
import { cartContext } from "../../../context/cartState";


const Productos = () => {

    const [product, setProduct] = useState([])

   
    const { addToCart } = useContext(cartContext);
    const handleCart = (item) => {
      addToCart(item)
    }   
    
     const getProduct = async () => {
            try {
                const res = await getProductRequest()
                setProduct(res)   
             } catch (error) {
                 (error)
             }
     }
  
     useEffect(() => {
         getProduct() 
     }, [])


     const profile = useAuthStore((state) => state.profile)
     const Cliente = profile?.rol === 'C';

      return (
  <>
      <div className="">
        {Cliente &&
          <div className="w-9/12 m-auto mb-24">
  
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4" >
      
          {
              product.map((item) => (
                  <div key={item.id} className="flex flex-col items-center p-4 shadow-xl border sm:p-6 rounded-xl dark:border-gray-700">
                  <img className="object-cover w-full rounded-xl aspect-square" src={item.img_product} alt="" />
                  <h1 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-white">{item.nombres}</h1>
                  <p className="mt-2 text-gray-500 dark:text-gray-300">{item.descripcion}</p>
                  <div className="flex flex-col mt-4">
                      <p className="text-black text-center font-semibold text-2xl">${item.precios}</p>
                  </div>  
                  <button onClick={() => handleCart(item)} className="border w-full text-2xl font-semibold bg-zinc-800 shadow-xl text-white rounded-md h-12 mt-2 flex items-center justify-center gap-4 hover:scale-110 transition-all delay-150 duration-300">
                      <span  className="mt-2 text-3xl"><MdAddShoppingCart /></span>Comprar
                  </button>
                  </div>
              ))
          }
              </div>
              </div>
}
      </div>
    </>
  )
}

export default Productos