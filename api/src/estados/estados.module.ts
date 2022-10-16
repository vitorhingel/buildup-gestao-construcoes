import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { EstadosController } from "./estados.controller";
import { EstadosService } from "./estados.service";

@Module({
  controllers: [EstadosController],
  providers: [EstadosService, PrismaService],
})
export class EstadosModule {}
