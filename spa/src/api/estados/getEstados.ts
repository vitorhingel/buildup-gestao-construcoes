import { AxiosResponse } from "axios";
import { instance } from "../instance";

export const getEstados = async (): Promise<AxiosResponse> => {
  const req = await instance.get(`/estados`);

  return req;
};
