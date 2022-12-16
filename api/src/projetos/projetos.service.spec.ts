import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { ProjetosService } from "./projetos.service";
import { MockContext, Context, createMockContext } from "../context.prisma";
import { nivelAcessoUsuario, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

let mockCtx: MockContext;
let ctx: Context;

describe("ProjetosService", () => {
  let service: ProjetosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjetosService, PrismaService],
    }).compile();

    service = module.get<ProjetosService>(ProjetosService);
    prisma = module.get<PrismaService>(PrismaService);

    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  it("O projeto não é criado caso o usuário não seja um projetista", async () => {
    const dataCriacao = new Date();
    const dataNascimento = new Date();

    const data = {
      titulo: "Projeto 1",
      descricao: "Projeto 1",
      dataInicio: "2022-10-14T03:41:54.562Z",
      enderecos: {
        create: {
          rua: "Testando 2",
          numero: 350,
          cep: "25650-061",
          complemento: null,
          cidadeId: 1,
        },
      },
      usuarios: {
        connect: {
          id: 1,
        },
      },
      ativo: true,
      colaboradores: {
        createMany: {
          data: [
            {
              ativo: true,
              usuarioId: 1,
            },
          ],
        },
      },
    };

    const findUniqueUserMockedResponse = {
      id: 1,
      dataCriacao,
      dataAtualizacao: null,
      nome: "Vitor Hingel",
      email: "testing@gmail.com",
      dataNascimento,
      nivelAcesso: nivelAcessoUsuario.administrador,
      ativo: true,
      enderecoId: 1,
      senha: "$2b$10$4LHE3sIN0rHhhPIJl9Cmkui02xNXJYb0bKufhC/P9CBsenBe/6Hni",
    };

    prisma.usuarios.findUnique = jest.fn().mockResolvedValueOnce(findUniqueUserMockedResponse);

    await expect(service.createProjetos(data)).rejects.toEqual(new BadRequestException("Somente projetistas podem criar projetos."));
  });

  it("O projeto é criado caso o usuário seja um projetista", async () => {
    const dataCriacao = new Date();
    const dataNascimento = new Date();

    const data = {
      titulo: "Projeto 1",
      descricao: "Projeto 1",
      dataInicio: "2022-10-14T03:41:54.562Z",
      enderecos: {
        create: {
          rua: "Testando 2",
          numero: 350,
          cep: "25650-061",
          complemento: null,
          cidadeId: 1,
        },
      },
      usuarios: {
        connect: {
          id: 11,
        },
      },
      ativo: true,
      colaboradores: {
        createMany: {
          data: [
            {
              ativo: true,
              usuarioId: 1,
            },
          ],
        },
      },
    };

    const findUniqueUserMockedResponse = {
      id: 1,
      dataCriacao,
      dataAtualizacao: null,
      nome: "Vitor Hingel",
      email: "testing@gmail.com",
      dataNascimento,
      nivelAcesso: nivelAcessoUsuario.projetista,
      ativo: true,
      enderecoId: 1,
      senha: "$2b$10$4LHE3sIN0rHhhPIJl9Cmkui02xNXJYb0bKufhC/P9CBsenBe/6Hni",
    };

    const createProjectMockedResponse = {
      id: 5,
      dataCriacao: "2022-12-06T03:26:08.000Z",
      dataAtualizacao: null,
      titulo: "Projeto 1",
      descricao: "Projeto 1",
      dataInicio: "2022-10-14T00:00:00.000Z",
      ativo: true,
      enderecoId: 25,
      projetistaId: 11,
    };

    prisma.usuarios.findUnique = jest.fn().mockResolvedValueOnce(findUniqueUserMockedResponse);
    prisma.projetos.create = jest.fn().mockResolvedValueOnce(createProjectMockedResponse);

    await expect(service.createProjetos(data)).resolves.toEqual(createProjectMockedResponse);
  });

  it("O projeto é removido caso o projetista seja o criador", async () => {
    const findUniqueProjectMockedResponse = {
      projetistaId: 11,
    };

    const deleteProjectMockedResponse = {
      id: 5,
      dataCriacao: "2022-12-06T03:26:08.000Z",
      dataAtualizacao: null,
      titulo: "Projeto 1",
      descricao: "Projeto 1",
      dataInicio: "2022-10-14T00:00:00.000Z",
      ativo: true,
      enderecoId: 25,
      projetistaId: 11,
    };

    prisma.projetos.findUnique = jest.fn().mockResolvedValueOnce(findUniqueProjectMockedResponse);
    prisma.projetos.delete = jest.fn().mockResolvedValueOnce(deleteProjectMockedResponse);

    await expect(service.deleteProjetos({ id: 11 }, 11)).resolves.toEqual(deleteProjectMockedResponse);
  });

  it("O projeto não é removido caso o projetista não seja o criador", async () => {
    const findUniqueProjectMockedResponse = {
      projetistaId: 12,
    };

    prisma.projetos.findUnique = jest.fn().mockResolvedValueOnce(findUniqueProjectMockedResponse);

    await expect(service.deleteProjetos({ id: 12 }, 11)).rejects.toEqual(
      new ForbiddenException("Somente o criador pode deletar esse projeto.")
    );
  });
});
