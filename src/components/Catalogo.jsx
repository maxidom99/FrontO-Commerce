import { useState, useEffect } from "react"
import { getCategoryRequest } from "../api/category"
import Navbar from "./Navbar"

const Catalogo = () => {

    const [category, setCategory] = useState([])

   const getCategory = async () => {

           try {
                    const res = await getCategoryRequest()
                    setCategory(res)
                 
           } catch (error) {
               (error)
           }

   }

   useEffect(() => {
       getCategory()        
   }, [])
   
    return (
<>
    <div className="min-h-screen">
        <Navbar/>
    <div className="w-9/12 mb-24 m-auto">

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3" >
        
            {
                category.map((item) => (
                    <div key={item.id} className="flex flex-col items-center p-4 shadow-xl border sm:p-6 rounded-xl dark:border-gray-700">
                    <img className="object-cover w-full rounded-xl aspect-square" src={item.img_category} alt="" />
                    <h1 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-white">{item.nombre}</h1>
                    </div>
                ))
            }
            </div>
        </div>
    </div>
 </>
  )
}

export default Catalogo