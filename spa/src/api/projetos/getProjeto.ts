import { AxiosResponse } from "axios";
import { instance } from "../instance";

export const getProjeto = async (projetoId: string): Promise<AxiosResponse> => {
  const req = await instance.get(`/projetos/${projetoId}`);

  return req;
};
