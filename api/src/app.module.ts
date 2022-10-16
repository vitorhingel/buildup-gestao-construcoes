import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma.service";

import { UsuariosModule } from "./usuarios/usuarios.module";
import { CategoriaprodutosModule } from "./categoriaprodutos/categoriaprodutos.module";
import { CidadesModule } from "./cidades/cidades.module";
import { ColaboradoresModule } from "./colaboradores/colaboradores.module";
import { ComentariosModule } from "./comentarios/comentarios.module";
import { EnderecosModule } from "./enderecos/enderecos.module";
import { EstadosModule } from "./estados/estados.module";
import { NotificacoesModule } from "./notificacoes/notificacoes.module";
import { ProdutosModule } from "./produtos/produtos.module";
import { ProjetosModule } from "./projetos/projetos.module";
import { RecursosModule } from "./recursos/recursos.module";
import { TarefasModule } from "./tarefas/tarefas.module";

@Module({
  imports: [
    AuthModule,
    UsuariosModule,
    CategoriaprodutosModule,
    CidadesModule,
    ColaboradoresModule,
    ComentariosModule,
    EnderecosModule,
    EstadosModule,
    NotificacoesModule,
    ProdutosModule,
    ProjetosModule,
    RecursosModule,
    TarefasModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
