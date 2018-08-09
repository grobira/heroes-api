import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSchema } from './class/class.schema';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Class', schema: ClassSchema}])],
    controllers: [ClassesController],
    providers: [ClassesService],
    exports: [ClassesService]
})
export class ClassesModule {}
