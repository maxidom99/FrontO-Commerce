import axios, { isAxiosError } from "axios";

export const loginRequest = async (LoginData) => {
  try {
    const response = await axios.post("http://localhost:9090/login", LoginData);
    /*console.log("Ingreso correcto:", response.data);*/
    return response.data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
  }
}
};