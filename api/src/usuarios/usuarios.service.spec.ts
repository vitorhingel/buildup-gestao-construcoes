import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { MockContext, Context, createMockContext } from "../context.prisma";
import { nivelAcessoUsuario, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

let mockCtx: MockContext;
let ctx: Context;

describe("UsuariosService", () => {
  let service: UsuariosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService, PrismaService],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    prisma = module.get<PrismaService>(PrismaService);

    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  it("O novo usuário é criado e é realizado o hashing da senha.", async () => {
    const dataCriacao = new Date();
    const dataNascimento = new Date();

    const createUserMockedResponse = {
      id: 15,
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

    prisma.usuarios.create = jest.fn().mockResolvedValueOnce(createUserMockedResponse);

    const userData: Prisma.UsuariosCreateInput = {
      nome: "Vitor Hingel",
      email: "testing@gmail.com",
      dataCriacao,
      dataNascimento,
      nivelAcesso: nivelAcessoUsuario.administrador,
      ativo: true,
      enderecos: {
        connect: {
          id: 1,
        },
      },
      senha: "vitor123",
    };

    await expect(service.criarUsuarios(userData)).resolves.toEqual(createUserMockedResponse);
  });

  it("O novo usuário não é criado e não é realizado o hashing da senha.", async () => {
    const dataCriacao = new Date();
    const dataNascimento = new Date();

    const data = {
      id: 15,
      dataCriacao,
      dataAtualizacao: null,
      nome: "Vitor Hingel",
      email: "testing@gmail.com",
      dataNascimento,
      nivelAcesso: nivelAcessoUsuario.administrador,
      ativo: true,
      enderecos: {
        connect: {
          id: 1,
        },
      },
      senha: "",
    };

    prisma.usuarios.create = jest.fn().mockRejectedValueOnce(new BadRequestException("Você deve fornecer uma senha válida"));

    await expect(service.criarUsuarios(data)).rejects.toEqual(new BadRequestException("Você deve fornecer uma senha válida"));
  });
});
