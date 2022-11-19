import { useMemo } from "react";
import { useHttpPrivate } from "../_base/use-http-private.hook";
import { BASE_URL } from "../../../constants/index";
import { useAuth } from "../../../hooks";

export const useMarkerApi = () => {
  const { auth } = useAuth();
  const httpInstance = useHttpPrivate(BASE_URL, {
    "Authorization": `Bearer ${auth?.token}`
  });

  const getMarker = async (ownerId) => {
    return await httpInstance.get(
      `/marker/show/${ownerId}`
    );
  };

  const getMarkers = async ({typeInMap, title, owner}) => {
    return await httpInstance.get(
      "/marker/list",
      { params: { typeInMap, title, owner } }
    );
  };

  const delMarker = async (id) => {
    return await httpInstance.del(`/marker/${id}/delete`);
  };

  return useMemo(
    () => ({
      getMarker,
      getMarkers,
      delMarker
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};
