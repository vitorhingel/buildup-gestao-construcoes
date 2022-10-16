export enum StatusOptions {
  IDLE,
  LOADING,
  ERROR,
}

export enum UsuariosNivelAcesso {
  EMPREGADO = "empregado",
  PROJETISTA = "projetista",
  ADMINISTRADOR = "administrador",
}

export interface Colaboradores {
  ativo: boolean;
  usuarioId: number;
}

export interface Usuarios {
  id: number;
  email: string;
  nome: string;
  nivelAcesso: UsuariosNivelAcesso;
}

export interface Estados {
  id: number;
  dataCriacao: string;
  dataAtualizacao: string | null;
  nome: string;
  sigla: string;
}

export interface Cidades {
  id: number;
  dataCriacao: string;
  dataAtualizacao: string | null;
  nome: string;
  estadoId: number;
}
