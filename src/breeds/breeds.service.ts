import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Breed } from './breed/breed.interface'; 
import { BreedDto } from './breed/breed.dto';


@Injectable()
export class BreedsService{

    constructor(@InjectModel('Breed') private readonly breedModel: Model<Breed>) {}

    async create(breedDto: BreedDto): Promise<Breed> {
        const createdBreed = new this.breedModel(breedDto);
        return await createdBreed.save();
    }

    async findByName(breedName : String): Promise<Breed>{
        return await this.breedModel.findOne({name : breedName});
    }

    async findAll(): Promise<Breed[]> {
        return await this.breedModel.find().exec();
    }
}