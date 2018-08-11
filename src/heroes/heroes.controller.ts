import { Controller, Get, Post, HttpCode, Body } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { Hero } from './hero/hero.interface';
import { HeroDto } from './hero/hero.dto';
import { MessagePattern } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';

@Controller('heroes')
export class HeroesController {

    constructor(private readonly heroesService: HeroesService) {}

    @Post()
    @HttpCode(204)
    async create(@Body() heroDto: HeroDto): Promise<Hero>{
        return this.heroesService.create(heroDto);
    }

    @Get()
    findAll(): Promise<Hero[]>{
        return this.heroesService.findAll();
    }

    @MessagePattern({cmd : 'findOne'})
    findById(data: String): Observable<any>{
        console.log('hero requested');
        return of(this.heroesService.findById(data));
    }
}
