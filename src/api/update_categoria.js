import axios from "axios";

export const updateCategoryRequest = async (categoryData) => {
  try {
    const response = await axios.post("http://localhost:9090/mod_category", categoryData);
    console.log("Categoría actualizada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    throw error;
  }
};