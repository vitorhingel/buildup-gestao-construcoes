import { Test, TestingModule } from "@nestjs/testing";
import { ForbiddenException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MockContext, Context, createMockContext } from "../context.prisma";
import { nivelAcessoUsuario, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { UsuariosService } from "../usuarios/usuarios.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

let mockCtx: MockContext;
let ctx: Context;

describe("AuthService", () => {
  let authService: AuthService;
  let usuarioService: UsuariosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,

        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: "12 hours" },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService, UsuariosService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    usuarioService = module.get<UsuariosService>(UsuariosService);

    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  it("As credenciais providenciadas estão corretas", async () => {
    const encontrarUsuarioMockedResponse = {
      id: 18,
      dataAtualizacao: null,
      nome: "Vitor Hingel",
      email: "testing@gmail.com",
      nivelAcesso: nivelAcessoUsuario.administrador,
      dataCriacao: "2022-12-06T02:05:55.000Z",
      dataNascimento: "2022-12-06T00:00:00.000Z",
      ativo: true,
      enderecoId: 1,
      senha: "$2b$10$kkfBMU7DKPeSlRYkKouU5OYow/RNVah.yuXm.Ct1XVc6jDNQNmh8e",
    };

    usuarioService.encontrarUsuario = jest.fn().mockResolvedValueOnce(encontrarUsuarioMockedResponse);

    await expect(authService.validarUsuario(encontrarUsuarioMockedResponse.email, "vitor123")).resolves.toEqual(
      encontrarUsuarioMockedResponse
    );
  });

  it("As credenciais providenciadas estão erradas", async () => {
    const encontrarUsuarioMockedResponse = {
      id: 18,
      dataAtualizacao: null,
      nome: "Vitor Hingel",
      email: "testing@gmail.com",
      nivelAcesso: nivelAcessoUsuario.administrador,
      dataCriacao: "2022-12-06T02:05:55.000Z",
      dataNascimento: "2022-12-06T00:00:00.000Z",
      ativo: true,
      enderecoId: 1,
      senha: "$2b$10$kkfBMU7DKPeSlRYkKouU5OYow/RNVah.yuXm.Ct1XVc6jDNQNmh8e",
    };

    usuarioService.encontrarUsuario = jest.fn().mockResolvedValueOnce(encontrarUsuarioMockedResponse);

    await expect(authService.validarUsuario(encontrarUsuarioMockedResponse.email, "vitor1233")).rejects.toEqual(
      new ForbiddenException("Senha inválida")
    );
  });
});
