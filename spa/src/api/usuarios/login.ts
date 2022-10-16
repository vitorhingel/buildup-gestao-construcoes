import { AxiosResponse } from "axios";
import { instance } from "../instance";

export const login = async (username: string, password: string): Promise<AxiosResponse> => {
  const req = await instance.post(`/auth/login`, { username, password });

  return req;
};
