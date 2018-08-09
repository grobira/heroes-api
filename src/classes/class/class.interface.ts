import { Document } from 'mongoose';

export interface Class extends Document{
    name: String,
    mult : {
        hp: Number,
        str: Number,
        int: Number,
        lck: Number,
        dex: Number
    }
}