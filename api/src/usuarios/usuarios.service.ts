import { Injectable } from "@nestjs/common";

import { Usuarios, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import * as bcrypt from "bcrypt";
const saltOrRounds = 10;

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async encontrarUsuario(postWhereUniqueInput: Prisma.UsuariosWhereUniqueInput): Promise<Usuarios | null> {
    return this.prisma.usuarios.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async validarSenha(hashSenhaBanco: string, senha: string): Promise<boolean> {
    const resultadoDaComparacao = await bcrypt.compare(senha, hashSenhaBanco);

    return resultadoDaComparacao;
  }

  async encontrarUsuarios(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsuariosWhereUniqueInput;
    where?: Prisma.UsuariosWhereInput;
    orderBy?: Prisma.UsuariosOrderByWithRelationInput;
  }): Promise<Partial<Usuarios>[]> {
    const { skip, take, cursor, where } = params;
    return this.prisma.usuarios.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: {
        nome: "asc",
      },
      select: {
        id: true,
        email: true,
        nome: true,
        nivelAcesso: true,
      },
    });
  }

  async criarUsuarios(data: Prisma.UsuariosCreateInput): Promise<Usuarios> {
    const { senha, ...dados } = data;

    const hashSenha = await bcrypt.hash(senha, saltOrRounds);

    return this.prisma.usuarios.create({
      data: {
        ...dados,
        senha: hashSenha,
      },
    });
  }

  async atualizarUsuarios(params: { where: Prisma.UsuariosWhereUniqueInput; data: Prisma.UsuariosUpdateInput }): Promise<Usuarios> {
    const { data, where } = params;
    return this.prisma.usuarios.update({
      data: {
        ...data,
        dataAtualizacao: new Date(),
      },
      where,
    });
  }

  async deletarUsuarios(where: Prisma.UsuariosWhereUniqueInput): Promise<Usuarios> {
    return this.prisma.usuarios.delete({
      where,
    });
  }
}
