import { useNavigate } from "react-router-dom";
import { axiosDefault } from "./use-axios.hook";

export const useHttp = (baseURL) => {
  const instance = axiosDefault(baseURL);
  const navigate = useNavigate();

  const resetToken = (error) =>{
    if(error.response.status===401){
      document.cookie = "localizaCookie= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      navigate(0);
    }
    throw error;
  }

  const get = async (url) => {
    try {
      return await instance.get(url);
    } catch (error) {
      resetToken(error);
    }
  };

  const post = async (url, data) => {
    try {
      return await instance.post(url, data);
    } catch (error) {
      resetToken(error);
    }
  };

  const put = async (url, data) => {
    try {
      return await instance.put(url, data);
    } catch (error) {
      resetToken(error);
    }
  };

  const del = async (url) => {
    try {
      return await instance.delete(url);
    } catch (error) {
      resetToken(error);
    }
  };

  return {
    get,
    post,
    put,
    del,
  };
};
