import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Req } from "@nestjs/common";
import { ProjetosService } from "./projetos.service";
import { Prisma, Projetos as ProjetosModel } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
@Controller("projetos")
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getProjeto(@Param("id") id: string): Promise<ProjetosModel> {
    return this.projetosService.getProjeto({ id: Number(id) });
  }

  @UseGuards(JwtAuthGuard)
  @Get("")
  async listProjetos() {
    return this.projetosService.listProjetos({});
  }

  @UseGuards(JwtAuthGuard)
  @Get("/usuario/:id")
  async listUsuarioProjetos(@Param("id") id) {
    return this.projetosService.listProjetos({
      where: {
        usuarios: {
          id: +id,
        },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post("")
  async createProjeto(@Body() data: Prisma.ProjetosCreateInput, @Req() req): Promise<ProjetosModel> {
    return this.projetosService.createProjetos({
      ...data,
      usuarios: {
        connect: {
          id: req.user.usuarioId,
        },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateProjeto(@Param("id") id: string, @Body() data: Prisma.ProjetosUpdateInput): Promise<ProjetosModel> {
    return this.projetosService.updateProjetos({
      where: { id: Number(id) },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteProjeto(@Param("id") id: string): Promise<ProjetosModel> {
    return this.projetosService.deleteProjetos({ id: Number(id) });
  }
}
