
import { useState, useEffect } from "react"
import { getProductRequest } from "../api/product"


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
    <div>
        <div className="grid grid-cols-2 gap-10 p-4" >

    
        {
            product.map((item, index) => (
                <div key={index} className="p-2 rounded-md shadow-xl text-red-800">
                        <p className="">des: {item.descripcion} nomre: {item.nombres}</p>

                </div>
            ))
        }
            </div>
    </div>
  )
}

export default Home