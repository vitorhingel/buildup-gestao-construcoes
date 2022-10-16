import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { UsuariosModule } from "src/usuarios/usuarios.module";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [
    PassportModule,
    UsuariosModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "12 hours" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
