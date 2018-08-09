import { Test, TestingModule } from '@nestjs/testing';
import { HeroesController } from './heroes.controller';

describe('Heroes Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [HeroesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: HeroesController = module.get<HeroesController>(HeroesController);
    expect(controller).toBeDefined();
  });
});
