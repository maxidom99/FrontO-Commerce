import axios from "axios"


 export const getCategoryRequest = async() => {
    try {
        const response = await axios.get("http://localhost:9090/categorias")
        //console.log(response.data)
        return response.data
    } catch (error) {
        console.log("Error en el fetch: ", error)
    }
 }