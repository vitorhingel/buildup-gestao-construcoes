import { Injectable } from "@nestjs/common";
import { Estados, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EstadosService {
  constructor(private prisma: PrismaService) {}

  async listEstados(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EstadosWhereUniqueInput;
    where?: Prisma.EstadosWhereInput;
    orderBy?: Prisma.EstadosOrderByWithRelationInput;
  }): Promise<Estados[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.estados.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: {
        nome: "asc",
      },
    });
  }
}
