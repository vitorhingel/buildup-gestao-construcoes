import { Controller, Post, UseGuards, Body, Get, Param } from "@nestjs/common";
import { Prisma, Tarefas as TarefasModel } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TarefasService } from "./tarefas.service";

@Controller("tarefas")
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Post("")
  @UseGuards(JwtAuthGuard)
  async cadastrarTarefa(@Body() dadosTarefa: Prisma.TarefasCreateInput): Promise<TarefasModel | null> {
    return this.tarefasService.criarTarefa(dadosTarefa);
  }

  @Get("/projeto/:id")
  @UseGuards(JwtAuthGuard)
  async listarTarefas(@Param("id") id: number): Promise<TarefasModel[]> {
    return this.tarefasService.listarTarefas({
      where: {
        colaboradores: {
          projetoId: id,
        },
      },
    });
  }
}
