import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from "@nestjs/common";

import { Prisma, Usuarios as UsuariosModel } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UsuariosService } from "./usuarios.service";

@Controller("usuarios")
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async encontrarUsuarioPorId(@Param("id") id: string): Promise<UsuariosModel> {
    return this.usuariosService.encontrarUsuario({ id: Number(id) });
  }

  // @Post("cadastrar")
  // @UseGuards(JwtAuthGuard)
  // async cadastrarUsuario(@Body() dadosUsuarios: Prisma.UsuariosCreateInput): Promise<UsuariosModel> {
  //   return this.usuariosService.criarUsuarios(dadosUsuarios);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listUsuarios() {
    return this.usuariosService.encontrarUsuarios({});
  }
}
