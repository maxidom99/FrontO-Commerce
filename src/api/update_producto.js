import axios from "axios";

export const updateProductRequest = async (productData) => {
  try {
    const response = await axios.post("http://localhost:9090/mod_produ", productData);
    console.log("Producto actualizado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};