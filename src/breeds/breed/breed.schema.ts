import * as mongoose from 'mongoose';

export const BreedSchema = new mongoose.Schema({
    name: String,
    mult : {
        hp: Number,
        str: Number,
        int: Number,
        lck: Number,
        dex: Number
    },
    strAtk: {
        damage: Number,
        odds: Number
    },
    intAtk: {
        damage: Number,
        odds: Number
    }
})