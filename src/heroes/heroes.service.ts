import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './hero/hero.interface';
import { Model } from 'mongoose';
import { HeroDto } from './hero/hero.dto';
import { HeroSchema } from './hero/hero.schema';
import { Observable, of } from 'rxjs';

@Injectable()
export class HeroesService {

    constructor(@InjectModel('Hero') private readonly heroModel: Model<Hero>) {}
    
    async create(heroDto: HeroDto): Promise<Hero> {
        const newHero = new this.heroModel(this.createHero(heroDto));
        return await newHero.save();
    }

    async findAll(): Promise<Hero[]> {
        return await this.heroModel.find().exec();
    }

    findById(id: String): Hero{
        return this.heroModel.findById(id);
    }

    createHero(heroDto: HeroDto): Model<Hero>{
        const newHero : Model<Hero> = 
            {
                firstname : heroDto.firstname,
                lastname : heroDto.lastname,
                class: heroDto.class,
                breed: heroDto.breed,
                status : heroDto.status,
                hp: this.getHeroHP(heroDto),
                multipliers: this.getHeroMulp(heroDto)
            };

        return newHero;
    }

    getHeroHP(heroDto: HeroDto): Number{
        let hp : number = 0;
        let baseHP : number = 1500;

        hp =  (heroDto.status.str * 1000) + (heroDto.status.dex) * 50 + (heroDto.status.int * 40) ;

        hp = (hp + baseHP);

        return hp;
    }

    getHeroMulp(heroDto: HeroDto): any {
        return {
            hp : 1,
            str: 1,
            int: 1,
            lck: 1,
            dex: 1,
        }
    }
    
}
