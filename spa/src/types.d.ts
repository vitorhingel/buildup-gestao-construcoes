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
  id: number;
  usuarioId: number;
  usuarios?: {
    email: string;
    nome: string;
  };
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

export interface TarefasBase {
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  estado: EstadoDaTarefa;
  colaboradorId: number;
}

export interface Tarefas extends TarefasBase {
  id: number;
  dataCriacao: Date;
  dataAtualizacao: Date | null;
}

export enum EstadoDaTarefa {
  PENDENTE = "pendente",
  CONFIRMADA = "confirmada",
  CONCLUIDA = "concluida",
}

export interface AutoCompleteOptions<T> {
  id: T;
  nome: string;
}
