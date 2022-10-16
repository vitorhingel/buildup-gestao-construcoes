import { AxiosResponse } from "axios";
import { instance } from "../instance";

export const getUsuarios = async (): Promise<AxiosResponse> => {
  const req = await instance.get(`/usuarios`);

  return req;
};
