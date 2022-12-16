import { Test, TestingModule } from "@nestjs/testing";
import { TarefasService } from "./tarefas.service";
import { MockContext, Context, createMockContext } from "../context.prisma";
import { estadoDaTarefa, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { BadRequestException } from "@nestjs/common";

let mockCtx: MockContext;
let ctx: Context;

describe("TarefasService", () => {
  let service: TarefasService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TarefasService, PrismaService],
    }).compile();

    service = module.get<TarefasService>(TarefasService);
    prisma = module.get<PrismaService>(PrismaService);

    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  it("Autoriza a criação de tarefas onde a data inicio é antes da de fim", async () => {
    const dataInicio = "2022-12-01T02:31:55.781Z";
    const dataFim = "2022-12-06T02:31:55.781Z";

    const data = {
      titulo: "titulo",
      descricao: "descricao",
      dataInicio,
      dataFim,
      estado: estadoDaTarefa.pendente,
      colaboradores: {
        connect: {
          id: 10,
        },
      },
    };

    const createTarefaMockedResponse = {
      id: 9,
      dataCriacao: "2022-12-06T02:53:12.000Z",
      dataAtualizacao: null,
      titulo: "titulo",
      descricao: "descricao",
      dataInicio: "2022-12-01T00:00:00.000Z",
      dataFim: "2022-12-05T00:00:00.000Z",
      estado: "pendente",
      colaboradorId: 10,
    };

    prisma.tarefas.create = jest.fn().mockResolvedValueOnce(createTarefaMockedResponse);

    await expect(service.criarTarefa(data)).resolves.toEqual(createTarefaMockedResponse);
  });

  it("Rejeita a criação de tarefas onde a data inicio é depois da de fim", async () => {
    const dataInicio = "2022-12-06T02:31:55.781Z";
    const dataFim = "2022-12-06T02:31:55.781Z";

    const data = {
      titulo: "titulo",
      descricao: "descricao",
      dataInicio,
      dataFim,
      estado: estadoDaTarefa.pendente,
      colaboradores: {
        connect: {
          id: 10,
        },
      },
    };

    prisma.tarefas.create = jest.fn().mockRejectedValueOnce(new BadRequestException("A data de início deve ser antes da de fim"));

    await expect(service.criarTarefa(data)).rejects.toEqual(new BadRequestException("A data de início deve ser antes da de fim"));
  });

  it("Autoriza a criação de tarefas onde o ID do colaborador é válido", async () => {
    const dataInicio = "2022-12-10T02:31:55.781Z";
    const dataFim = "2022-12-20T02:31:55.781Z";

    const data = {
      titulo: "titulo",
      descricao: "descricao",
      dataInicio,
      dataFim,
      estado: estadoDaTarefa.pendente,
      colaboradores: {
        connect: {
          id: 1,
        },
      },
    };

    const createTarefaMockedResponse = {
      id: 9,
      dataCriacao: "2022-12-06T02:53:12.000Z",
      dataAtualizacao: null,
      titulo: "titulo",
      descricao: "descricao",
      dataInicio: "2022-12-01T00:00:00.000Z",
      dataFim: "2022-12-05T00:00:00.000Z",
      estado: "pendente",
      colaboradorId: 1,
    };

    prisma.tarefas.create = jest.fn().mockResolvedValueOnce(createTarefaMockedResponse);

    await expect(service.criarTarefa(data)).resolves.toEqual(createTarefaMockedResponse);
  });

  it("Rejeita a criação de tarefas onde não existe colaborador ou é um colaborador inválido", async () => {
    const dataInicio = "2022-12-10T02:31:55.781Z";
    const dataFim = "2022-12-20T02:31:55.781Z";

    const data = {
      titulo: "titulo",
      descricao: "descricao",
      dataInicio,
      dataFim,
      estado: estadoDaTarefa.pendente,
      colaboradores: {
        connect: {
          id: -1,
        },
      },
    };

    prisma.tarefas.create = jest.fn().mockRejectedValueOnce(new BadRequestException("Você deve definir um colaborador válido"));

    await expect(service.criarTarefa(data)).rejects.toEqual(new BadRequestException("Você deve definir um colaborador válido"));
  });
});
