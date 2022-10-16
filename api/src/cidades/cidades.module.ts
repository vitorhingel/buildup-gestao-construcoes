import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CidadesController } from "./cidades.controller";
import { CidadesService } from "./cidades.service";

@Module({
  controllers: [CidadesController],
  providers: [CidadesService, PrismaService],
})
export class CidadesModule {}
