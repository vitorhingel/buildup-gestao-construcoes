import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { PrismaService } from "../prisma.service";
import { UsuariosService } from "../usuarios/usuarios.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "12 hours" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService, UsuariosService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
