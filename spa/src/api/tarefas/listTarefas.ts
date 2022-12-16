import { AxiosResponse } from "axios";
import { instance } from "../instance";

export const listTarefas = async (projetosId: number): Promise<AxiosResponse> => {
  const req = await instance.get(`/tarefas/projeto/${projetosId}`);

  return req;
};
