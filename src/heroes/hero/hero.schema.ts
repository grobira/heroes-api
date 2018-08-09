import * as mongoose from 'mongoose';

export const HeroSchema = new mongoose.Schema({
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
});