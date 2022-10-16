import { Injectable } from "@nestjs/common";
import { Cidades, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CidadesService {
  constructor(private prisma: PrismaService) {}

  async listCidades(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CidadesWhereUniqueInput;
    where?: Prisma.CidadesWhereInput;
    orderBy?: Prisma.CidadesOrderByWithRelationInput;
  }): Promise<Cidades[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cidades.findMany({
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
