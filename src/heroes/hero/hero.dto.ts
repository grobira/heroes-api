import { IsString, IsInt, IsDefined } from 'class-validator';

export class HeroDto {
    @IsString()
    readonly firstname: string;

    @IsString()
    readonly lastname: string;

    @IsString()
    readonly class: string;

    @IsString()
    readonly breed: string;

    @IsDefined()
    readonly status: {
        str : number;
        int: number;
        lck: number;
        dex: number
    }
}