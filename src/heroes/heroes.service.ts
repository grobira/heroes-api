import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './hero/hero.interface';
import { Model } from 'mongoose';
import { HeroDto } from './hero/hero.dto';
import { Observable, of } from 'rxjs';
import { ClassesService } from 'classes/classes.service';
import { BreedsService } from 'breeds/breeds.service';

@Injectable()
export class HeroesService {

    constructor(@InjectModel('Hero') private readonly heroModel: Model<Hero>, 
                        private readonly classesService: ClassesService,
                        private readonly breedsService: BreedsService) {}
    
    async create(heroDto: HeroDto): Promise<Hero> {
        const newHero = new this.heroModel(await this.createHero(heroDto));
        return await newHero.save();
    }

    async findAll(): Promise<Hero[]> {
        return await this.heroModel.find().exec();
    }

    findById(id: String): Observable<any>{
        return this.heroModel.findOne({_id: id}).exec();
    }

    async createHero(heroDto: HeroDto): Promise<any>{
        let newHero  = {
                hp: await this.getHeroHP(heroDto),
                multipliers: await this.getHeroMulp(heroDto),
                firstname : heroDto.firstname,
                lastname : heroDto.lastname,
                class: heroDto.class,
                breed: heroDto.breed,
                status : heroDto.status
            };

        newHero.status = this.applyMult(newHero.status, newHero.multipliers);
        return newHero;
    }

    getHeroHP(heroDto: HeroDto): Number{
        let hp : number = 0;
        let baseHP : number = 1500;

        hp =  (heroDto.status.str * 100) + (heroDto.status.dex) * 50 + (heroDto.status.int * 40) ;

        hp = (hp + baseHP);

        return hp;
    }

    async getHeroMulp(heroDto: HeroDto): Promise<any>{
        let classMulp;
        let breedMulp;
        classMulp = await this.classesService.findByName(heroDto.class);
        breedMulp = await this.breedsService.findByName(heroDto.breed)
        
        return {
            "hp": 1 + classMulp.mult.hp + breedMulp.mult.hp,
            "str": 1 + classMulp.mult.str + breedMulp.mult.str,
            "int": 1 + classMulp.mult.int + breedMulp.mult.int,
            "lck": 1 + classMulp.mult.lck + breedMulp.mult.lck,
            "dex": 1 + classMulp.mult.dex + breedMulp.mult.dex,
        }
    }

    applyMult(status, mult){
        return {
            "hp" : status.hp * mult.hp,
            "str": status.str * mult.str,
            "int": status.int * mult.int,
            "lck": status.lck * mult.lck,
            "dex": status.dex * mult.dex
        }
    }
    
}
