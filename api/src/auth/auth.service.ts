import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { Usuarios } from "@prisma/client";
import { UsuariosService } from "../usuarios/usuarios.service";

@Injectable()
export class AuthService {
  constructor(private readonly usuariosService: UsuariosService, private readonly jwtService: JwtService) {}

  async validarUsuario(username: string, pass: string): Promise<any> {
    const usuario = await this.usuariosService.encontrarUsuario({ email: username });

    if (!usuario) throw new NotFoundException("Esse usuário não foi encontrado.");

    const senhasIguais = await this.usuariosService.validarSenha(usuario.senha, pass);

    if (!senhasIguais) throw new ForbiddenException("Senha inválida");

    return usuario;
  }

  async login(usuario: Usuarios) {
    const payload = { nome: usuario.nome, sub: usuario.id, nivelAcesso: usuario.nivelAcesso };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
