import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "./use-axios.hook";

export const useHttpPrivate = (baseURL, headers) => {
  const instance = axiosPrivate(baseURL, headers);
  const navigate = useNavigate();

  const resetToken = (error) =>{
    if(error.response.status===401 || error.code==="ERR_NETWORK"){
      document.cookie = "localizaCookie= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      navigate(0);
    }
    throw error;
  }

  const get = async (url, headers) => {
    try {
      return await instance.get(url, headers);
    } catch (error) {
      resetToken(error);
    }
  };

  const post = async (url, data, headers) => {
    try {
      return await instance.post(url, data, headers);
    } catch (error) {
      resetToken(error);
    }
  };

  const put = async (url, data, headers) => {
    try {
      return await instance.put(url, data, headers);
    } catch (error) {
      resetToken(error);
    }
  };

  const del = async (url, headers) => {
    try {
      return await instance.delete(url, headers);
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
