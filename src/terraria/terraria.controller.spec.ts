import { Test, TestingModule } from '@nestjs/testing';
import { TerrariaController } from './terraria.controller';

describe('TerrariaController', () => {
  let controller: TerrariaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerrariaController],
    }).compile();

    controller = module.get<TerrariaController>(TerrariaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
