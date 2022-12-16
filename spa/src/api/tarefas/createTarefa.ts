import { AxiosResponse } from "axios";
import { instance } from "../instance";

export const createTarefa = async (data: any): Promise<AxiosResponse> => {
  const req = await instance.post(`/tarefas`, data);

  return req;
};
