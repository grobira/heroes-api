import { Controller, Get, Post, HttpCode, Body } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { Hero } from './hero/hero.interface';
import { HeroDto } from './hero/hero.dto';

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
}
