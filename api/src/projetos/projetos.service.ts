import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, Projetos } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProjetosService {
  constructor(private prisma: PrismaService) {}

  async getProjeto(projetosWhereUniqueInput: Prisma.ProjetosWhereUniqueInput): Promise<Projetos | null> {
    const projeto = await this.prisma.projetos.findUnique({
      where: projetosWhereUniqueInput,
      include: {
        colaboradores: {
          include: {
            usuarios: {
              select: {
                email: true,
                nome: true,
              },
            },
            tarefas: true,
          },
        },
      },
    });

    if (!projeto) throw new NotFoundException("Projeto não encontrado");

    return projeto;
  }

  async listProjetos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjetosWhereUniqueInput;
    where?: Prisma.ProjetosWhereInput;
    orderBy?: Prisma.ProjetosOrderByWithRelationInput;
  }): Promise<Projetos[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projetos.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        colaboradores: {
          include: {
            usuarios: {
              select: {
                email: true,
              },
            },
            _count: {
              select: {
                tarefas: true,
              },
            },
          },
        },
      },
    });
  }

  async createProjetos(data: Prisma.ProjetosCreateInput): Promise<Projetos> {
    return this.prisma.projetos.create({
      data,
    });
  }

  async updateProjetos(params: { where: Prisma.ProjetosWhereUniqueInput; data: Prisma.ProjetosUpdateInput }): Promise<Projetos> {
    const { where, data } = params;
    return this.prisma.projetos.update({
      data,
      where,
    });
  }

  async deleteProjetos(where: Prisma.ProjetosWhereUniqueInput): Promise<Projetos> {
    return this.prisma.projetos.delete({
      where,
    });
  }
}
