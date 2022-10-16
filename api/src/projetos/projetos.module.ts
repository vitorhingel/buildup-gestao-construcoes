import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ProjetosController } from "./projetos.controller";
import { ProjetosService } from "./projetos.service";

@Module({
  controllers: [ProjetosController],
  providers: [ProjetosService, PrismaService],
})
export class ProjetosModule {}
