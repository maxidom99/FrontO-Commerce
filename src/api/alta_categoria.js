import axios from "axios";

export const createCategoryRequest = async (categoryData) => {
  try {
    const response = await axios.post("http://localhost:8000/creando_categoria", categoryData);
    console.log("Categoría creada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};