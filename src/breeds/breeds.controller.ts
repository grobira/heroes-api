import { Controller, Post } from "../../node_modules/@nestjs/common";
import { BreedsService } from "./breeds.service";


@Controller('breeds')
export class BreedsController{

    breeds = [
        { name : 'human' , mult : {hp: 0.4, str: 0.4, int: 0.4, lck: 0.5, dex: 0.5}}, 
        { name : 'elf' , mult : {hp: 0.7, str: 0.2, int: 0.6, lck: 0.5, dex: 0.6}},
        { name : 'dwarf' , mult : {hp: 0.6, str: 0.5, int: 0.1, lck: 0.2, dex: 0.6}},
        { name : 'undead' , mult : {hp: 0.5, str: 0.5, int: 0.1, lck: 0.2, dex: 0.3}},
        { name : 'druid' , mult : {hp: 0.4, str: 0.5, int: 0.5, lck: 0.4, dex: 0.4}},
            ];

    constructor(private readonly breedsService: BreedsService){}

    @Post('init')
    async init(): Promise<any>{
        this.breeds.map(classType => {
            this.breedsService.create(classType);
        });
    }
}
