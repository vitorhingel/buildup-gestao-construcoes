import { AxiosResponse } from "axios";
import { instance } from "../instance";

export const createProjeto = async (data: any): Promise<AxiosResponse> => {
  const req = await instance.post(`/projetos`, data);

  return req;
};
