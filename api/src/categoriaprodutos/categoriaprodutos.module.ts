import { Module } from '@nestjs/common';
import { CategoriaprodutosController } from './categoriaprodutos.controller';
import { CategoriaprodutosService } from './categoriaprodutos.service';

@Module({
  controllers: [CategoriaprodutosController],
  providers: [CategoriaprodutosService]
})
export class CategoriaprodutosModule {}
