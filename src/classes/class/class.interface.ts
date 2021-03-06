import { Document } from 'mongoose';

export interface Class extends Document{
    name: String,
    mult : {
        hp: number,
        str: number,
        int: number,
        lck: number,
        dex: number
    },
    strAtk: {
        damage: number,
        odds: number
    },
    intAtk: {
        damage: number,
        odds: number
    }
}