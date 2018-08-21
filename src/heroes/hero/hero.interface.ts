import { Document } from 'mongoose';

export interface Hero extends Document {
    firstname: string,

    lastname: string,

    hp: number, 

    status: {
        str : number,
        int: number,
        lck: number,
        dex: number
    },

    class: string,

    breed: string,

    multipliers: {
        hp : number,
        str : number,
        int: number,
        lck: number,
        dex: number
    }
}