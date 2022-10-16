import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface UserBase {
  sub: number;
  nome: string;
  nivelAcesso: "empregado" | "projetista" | "administrador";
}

export interface UserState extends UserBase {
  logado: boolean;
}

const initialState: Partial<UserState> = {
  sub: 0,
  nome: "",
  nivelAcesso: "empregado",
  logado: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserBase>) => {
      const { sub, nome, nivelAcesso } = action.payload;

      state.nome = nome;
      state.sub = sub;
      state.nivelAcesso = nivelAcesso;
      state.logado = true;
    },
    logout: (state) => {
      state.nome = initialState.nome;
      state.sub = initialState.sub;
      state.nivelAcesso = initialState.nivelAcesso;
      state.logado = initialState.logado;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
