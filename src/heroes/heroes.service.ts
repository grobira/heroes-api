import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './hero/hero.interface';
import { Model } from 'mongoose';
import { HeroDto } from './hero/hero.dto';
import { Observable, of } from 'rxjs';
import { ClassesService } from '../classes/classes.service';
import { BreedsService } from '../breeds/breeds.service';

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

    findById(id: string): Observable<any>{
        return this.heroModel.findOne({_id: id}).exec();
    }

    async createHero(heroDto: HeroDto): Promise<any>{
        let heroClass = await this.classesService.findByName(heroDto.class);
        let heroBreed = await this.breedsService.findByName(heroDto.breed);
        let newHero  = {
                multipliers: await this.getHeroMulp(heroDto, heroClass, heroBreed),
                hp: await this.getHeroHP(heroDto),
                firstname : heroDto.firstname,
                lastname : heroDto.lastname,
                class: heroDto.class,
                breed: heroDto.breed,
                status : heroDto.status,
                strAtk : await this.getHeroStrAtk(heroClass, heroBreed),
                intAtk : await this.getHeroIntAtk(heroClass, heroBreed)
            };

        newHero.status = this.applyMult(newHero.status, newHero.multipliers);
        return newHero;
    }

    getHeroHP(heroDto: HeroDto): Number{
        let hp : number = 0;
        let baseHP : number = 1500;

        hp =  (heroDto.status.str * 100) + (heroDto.status.dex) * 50 + (heroDto.status.int * 10) ;

        hp = (hp + baseHP);

        return hp;
    }

    async getHeroMulp(heroDto: HeroDto, heroClass, heroBreed): Promise<any>{
        return {
            "hp": 1 + heroClass.mult.hp + heroBreed.mult.hp,
            "str": 1 + heroClass.mult.str + heroBreed.mult.str,
            "int": 1 + heroClass.mult.int + heroBreed.mult.int,
            "lck": 1 + heroClass.mult.lck + heroBreed.mult.lck,
            "dex": 1 + heroClass.mult.dex + heroBreed.mult.dex,
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

    async getHeroStrAtk(heroClass, heroBreed): Promise<any>{
        return {
            "damage": heroClass.strAtk.damage + heroBreed.strAtk.damage,
            "odds": (heroClass.strAtk.odds + heroBreed.strAtk.odds)/2
        }
    }

    async getHeroIntAtk(heroClass, heroBreed): Promise<any>{
         return {
            "damage": heroClass.intAtk.damage + heroBreed.intAtk.damage,
            "odds": (heroClass.intAtk.odds + heroBreed.intAtk.odds)/2
        }
    }
    
}
