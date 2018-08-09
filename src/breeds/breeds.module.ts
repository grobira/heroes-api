import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BreedsService } from './breeds.service';
import { BreedSchema } from './breed/breed.schema';
import { BreedsController } from './breeds.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Breed', schema: BreedSchema}])],
    controllers: [BreedsController],
    providers: [BreedsService],
    exports: [BreedsService]
})
export class BreedsModule {}
