import axios from "axios";

export const createProductRequest = async (productData) => {
  try {
    const response = await axios.post("http://localhost:9090/alta_productos", productData);
    console.log("Producto creado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};