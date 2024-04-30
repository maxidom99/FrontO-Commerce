import axios from "axios";

export const loginRequest = async (LoginData) => {
  try {
    const response = await axios.post("http://localhost:9090/login", LoginData);
    /*console.log("Ingreso correcto:", response.data);*/
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};