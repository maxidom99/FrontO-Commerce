import axios from "axios"


 export const getProductRequest = async() => {
    try {
        const response = await axios.get("http://localhost:8000/productos")
        /*console.log(response.data)*/
        return response.data
    } catch (error) {
        console.log("Error en el fetch: ", error)
    }
 }