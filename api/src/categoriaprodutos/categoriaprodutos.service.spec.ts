import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaprodutosService } from './categoriaprodutos.service';

describe('CategoriaprodutosService', () => {
  let service: CategoriaprodutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaprodutosService],
    }).compile();

    service = module.get<CategoriaprodutosService>(CategoriaprodutosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
