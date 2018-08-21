import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Class } from './class/class.interface'; 
import { ClassDto } from './class/class.dto';


@Injectable()
export class ClassesService{

    constructor(@InjectModel('Class') private readonly classModel: Model<Class>) {}

    async create(classDto: ClassDto): Promise<Class> {
        const createdClass = new this.classModel(classDto);
        return await createdClass.save();
    }

    async findByName(className : String): Promise<Class>{
        return await this.classModel.findOne({name : className});
    }

    async findAll(): Promise<Class[]> {
        return await this.classModel.find().exec();
    }
}