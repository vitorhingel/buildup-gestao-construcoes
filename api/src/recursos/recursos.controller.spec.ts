import { Test, TestingModule } from '@nestjs/testing';
import { RecursosController } from './recursos.controller';

describe('RecursosController', () => {
  let controller: RecursosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecursosController],
    }).compile();

    controller = module.get<RecursosController>(RecursosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
