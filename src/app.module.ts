import { Module } from '@nestjs/common';
import { HeroesModule } from './heroes/heroes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BreedsModule } from './breeds/breeds.module';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [HeroesModule, BreedsModule, ClassesModule, MongooseModule.forRoot('mongodb://localhost:27017/heroes')]
})
export class AppModule {}
