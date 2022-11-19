import { useMemo } from "react";
import { useHttpPrivate } from "../_base/use-http-private.hook";
import { BASE_URL } from "../../../constants/index";
import { useAuth } from "../../../hooks";

export const usePetApi = () => {
  const { auth } = useAuth();
  const httpInstance = useHttpPrivate(BASE_URL, {
    "Authorization": `Bearer ${auth?.token}`
  });

  const getPets = async () => {
    return await httpInstance.get(
      "/pet/list"
    );
  };

  const getPetsByName = async (name) => {
    return await httpInstance.get(
      `/pet/list/${name}`
    );
  };

  const getPet = async (petId) => {
    return await httpInstance.get(
      `/pet/${petId}`
    );
  };

  const postPet = async (body) => {
    return await httpInstance.post(
      "/pet/save",
      body
    );
  };

  const putPet = async (id, body) => {
    return await httpInstance.put(
      `/pet/update/${id}`,
      body
    );
  };

  const delPet = async (id) => {
    return await httpInstance.del(`/pet/${id}/delete`);
  };

  return useMemo(
    () => ({
      getPets,
      getPet,
      getPetsByName,
      postPet,
      putPet,
      delPet
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};
