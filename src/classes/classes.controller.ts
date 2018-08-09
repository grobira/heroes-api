import { Controller, Post } from "../../node_modules/@nestjs/common";
import { ClassesService } from "./classes.service";


@Controller('classes')
export class ClassesController{

    classes = [
        { name : 'mage' , mult : {hp: 0.2, str: 0.1, int: 0.6, lck: 0.4, dex: 0.3}}, 
        { name : 'warrior' , mult : {hp: 0.7, str: 0.5, int: 0.1, lck: 0.2, dex: 0.4}},
        { name : 'priest' , mult : {hp: 0.4, str: 0.3, int: 0.5, lck: 0.5, dex: 0.4}},
        { name : 'thief' , mult : {hp: 0.3, str: 0.4, int: 0.1, lck: 0.6, dex: 0.5}},
        { name : 'ranger' , mult : {hp: 0.4, str: 0.5, int: 0.3, lck: 0.4, dex: 0.4}},
            ];

    constructor(private readonly classesService: ClassesService){}

    @Post('init')
    async init(): Promise<any>{
        this.classes.map(classType => {
            this.classesService.create(classType);
        });
    }
}
