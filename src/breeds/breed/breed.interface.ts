import { Document } from 'mongoose';

export interface Breed extends Document{
    name: String,
    mult : {
        hp: Number,
        str: Number,
        int: Number,
        lck: Number,
        dex: Number
    }
}