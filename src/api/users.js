import axios from "axios"


 export const getUserRequest = async() => {
    try {
        const response = await axios.get("http://localhost:9090/users")
        /*console.log(response.data)*/
        return response.data
    } catch (error) {
        console.log("Error en el fetch: ", error)
    }
 }