import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CidadesService } from "./cidades.service";

@Controller("cidades")
export class CidadesController {
  constructor(private cidadesService: CidadesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarCidades() {
    return this.cidadesService.listCidades({});
  }
}
