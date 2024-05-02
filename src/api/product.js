import axios from "axios"


 export const getProductRequest = async() => {
    try {
        const response = await axios.get("http://localhost:9090/productos")
        /*console.log(response.data)*/
        return response.data
    } catch (error) {
        console.log("Error en el fetch: ", error)
    }
 }

export const getProductRequestPages = async(pageNumber) => {
    try {
        const response = await axios.get(`http://localhost:9090/productos_pages?page=${pageNumber}`);
        return response.data;
    } catch (error) {
        console.log("Error en el fetch: ", error);
    }
}