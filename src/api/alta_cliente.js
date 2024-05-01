import axios from "axios";

export const createUserRequest = async (userData) => {
  try {
    const response = await axios.post("http://localhost:9090/alta_users", userData);
    //console.log("Producto creado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};