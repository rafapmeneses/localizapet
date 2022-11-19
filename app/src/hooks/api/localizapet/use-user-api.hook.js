import { useMemo } from "react";
import { useHttpPrivate } from "../_base/use-http-private.hook";
import { BASE_URL } from "../../../constants/index";
import { useAuth } from "../../../hooks";

export const useUserApi = () => {
  const { auth } = useAuth();
  const httpInstance = useHttpPrivate(BASE_URL, {
    "Authorization": `Bearer ${auth?.token}`
  });

  const getLoggedUser = async () => {
    return await httpInstance.get(
      "/user"
    );
  };

  const getUser = async (id) => {
    return await httpInstance.get(
      `/user/${id}`
    );
  };

  const getFullUser = async (id) => {
    return await httpInstance.get(
      `/user/full/${id}`
    );
  };

  const putUser = async (body) => {
    return await httpInstance.put(
      "/user",
      body
    );
  };

  return useMemo(
    () => ({
      getLoggedUser,
      getUser,
      getFullUser,
      putUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};
