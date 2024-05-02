import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
const UpdateForm = () => {

// al editarlo y usar axios le das este id como parametro 
    const {id} = useParams()

  return (
    <div className="flex justify-center items-center mt-24 flex-col ">
<Link to='/index' className="absolute top-5 left-5 border  px-3 py-1 rounded-md bg-gray-100  shadow-xl" >Volver</Link>
    <p className="font-semibold">El id de este producto es: {id}</p>
        <form action="" className="mt-24 border p-4 shadow-xl flex flex-col gap-y-10">
<input type="text" placeholder="Nombre" className="px-3 py-1 rounded-md border " />
<button className="px-3 py-1 rounded-md text-white bg-black">Guardar</button>
        </form>
    </div>
  )
}

export default UpdateForm