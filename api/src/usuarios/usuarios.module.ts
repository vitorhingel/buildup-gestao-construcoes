import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
