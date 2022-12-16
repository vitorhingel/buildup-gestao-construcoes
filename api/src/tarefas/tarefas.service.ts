import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma, Tarefas } from "@prisma/client";
import { isAfter, parseISO } from "date-fns";
import { PrismaService } from "../prisma.service";

@Injectable()
export class TarefasService {
  constructor(private prisma: PrismaService) {}

  async criarTarefa(data: Prisma.TarefasCreateInput): Promise<Tarefas | null> {
    if (!data?.colaboradores?.connect?.id || data?.colaboradores?.connect?.id < 1)
      throw new BadRequestException("Você deve definir um colaborador válido");

    if (isAfter(parseISO(data.dataInicio as string), parseISO(data.dataFim as string)))
      throw new BadRequestException("A data de início deve ser antes da de fim");

    return await this.prisma.tarefas.create({ data });
  }

  async listarTarefas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TarefasWhereUniqueInput;
    where?: Prisma.TarefasWhereInput;
    orderBy?: Prisma.TarefasOrderByWithRelationInput;
  }): Promise<Tarefas[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tarefas.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
