import { Module } from '@nestjs/common';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { HeroSchema } from './hero/hero.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Hero', schema: HeroSchema}])],
    controllers: [HeroesController],
    providers: [HeroesService],
    exports: [HeroesService]
})
export class HeroesModule {}
