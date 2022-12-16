import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TarefasController } from "./tarefas.controller";
import { TarefasService } from "./tarefas.service";

@Module({
  controllers: [TarefasController],
  providers: [TarefasService, PrismaService],
})
export class TarefasModule {}
