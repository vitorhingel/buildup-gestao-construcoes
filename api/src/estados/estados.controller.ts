import { Controller, UseGuards, Get } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { EstadosService } from "./estados.service";

@Controller("estados")
export class EstadosController {
  constructor(private estadosService: EstadosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarEstados() {
    return this.estadosService.listEstados({});
  }
}
