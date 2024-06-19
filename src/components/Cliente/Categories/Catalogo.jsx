import { useState, useEffect } from "react"
import { getCategoryRequest } from "../../../api/category"
import { useAuthStore } from "../../../auth/store" 

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
   

   const profile = useAuthStore((state) => state.profile)
   const Cliente = profile?.rol === 'C';
   
    return (
<>


    <div className="">

    <div className="flex items-center justify-center mb-24 m-auto">

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4" >
        
            {
            category ?
            category.map((item) => (
                <div key={item.id} className="shadow-xl border hover:scale-105 tranistion-all duration-300 delay-120 rounded-full dark:border-gray-700 w-60">
                    <img className="object-cover rounded-full aspect-square" src={item.img_category} alt="" />
                </div>
            ))
            :
            <div className="text-center flex items-center">
                <p>Cargando...</p>  
            </div>
            }
            </div>
        </div>
    </div>

 </>
  )
}

export default Catalogo