import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../enums/role.enum";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Administrador, Role.Empregado)
  getAdmin(@Request() req) {
    return req.user;
  }

  //   @Roles(Role.Admin, Role.User)
  //   @UseGuards(JwtAuthGuard)
  //   @Get("user")
  //   getUser(@Request() req) {
  //     return "This is an User only role";
  //   }
}
