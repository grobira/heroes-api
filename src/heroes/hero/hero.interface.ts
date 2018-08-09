import { Document } from 'mongoose';

export interface Hero extends Document {
    firstname: String,

    lastname: String,

    hp: Number, 

    status: {
        str : Number,
        int: Number,
        lck: Number,
        dex: Number
    },

    class: String,

    breed: String,

    multipliers: {
        hp : Number,
        str : Number,
        int: Number,
        lck: Number,
        dex: Number
    }
}