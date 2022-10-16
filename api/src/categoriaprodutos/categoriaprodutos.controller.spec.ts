import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaprodutosController } from './categoriaprodutos.controller';

describe('CategoriaprodutosController', () => {
  let controller: CategoriaprodutosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaprodutosController],
    }).compile();

    controller = module.get<CategoriaprodutosController>(CategoriaprodutosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
