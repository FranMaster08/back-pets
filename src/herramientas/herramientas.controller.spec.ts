import { Test, TestingModule } from '@nestjs/testing';
import { HerramientasController } from './herramientas.controller';
import { HerramientasService } from './herramientas.service';

describe('HerramientasController', () => {
  let controller: HerramientasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HerramientasController],
      providers: [HerramientasService],
    }).compile();

    controller = module.get<HerramientasController>(HerramientasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
