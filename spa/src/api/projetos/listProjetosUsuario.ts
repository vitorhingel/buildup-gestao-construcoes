import { AxiosResponse } from "axios";
import { instance } from "../instance";

export const listProjetosUsuario = async (userId: number): Promise<AxiosResponse> => {
  const req = await instance.get(`/projetos/usuario/${userId}`);

  return req;
};
