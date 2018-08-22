import { IsString, IsInt, IsDefined } from 'class-validator';

export class ClassDto {
    readonly name: String;
    readonly mult : {
        hp: Number,
        str: Number,
        int: Number,
        lck: Number,
        dex: Number
    };
    readonly strAtk: {
        damage: Number,
        odds: Number
    };
    readonly intAtk: {
        damage: Number,
        odds: Number
    }
}