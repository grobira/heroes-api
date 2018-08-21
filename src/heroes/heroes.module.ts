import { Module } from '@nestjs/common';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { HeroSchema } from './hero/hero.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesModule } from 'classes/classes.module';
import { BreedsModule } from 'breeds/breeds.module';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Hero', schema: HeroSchema}]), ClassesModule, BreedsModule],
    controllers: [HeroesController],
    providers: [HeroesService],
    exports: [HeroesService]
})
export class HeroesModule {}
