import { AxiosResponse } from "axios";
import { instance } from "../instance";

export const getCidades = async (): Promise<AxiosResponse> => {
  const req = await instance.get(`/cidades`);

  return req;
};
