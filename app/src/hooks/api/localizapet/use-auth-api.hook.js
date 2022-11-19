import { useMemo } from "react";
import { useHttp } from "../_base/use-http.hook";
import { BASE_URL } from "../../../constants/index";

const BASE_URL_AUTH = "/auth";

export const useAuthApi = () => {
  const httpInstance = useHttp(BASE_URL);

  const postLogin = async ({ username, password }) => {
    return await httpInstance.post(
      BASE_URL_AUTH + "/signin",
      { username, password }
    );
  };

  const postRegister = async (body) => {
    return await httpInstance.post(
      BASE_URL_AUTH + "/signup",
      body
    );
  };

  const delLogout = () => {
    document.cookie = "localizaCookie= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return useMemo(
    () => ({
      postLogin,
      postRegister,
      delLogout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};
