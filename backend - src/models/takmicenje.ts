import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Takmicenje = new Schema(
    {
        sport: { type: String },
        disciplina: { type: String },
        pol: { type: String },
        datumPocetka: { type: String },
        datumKraja: { type: String },
        lokacija: { type: String },
        tip: { type: String },
        takmicari: { type: Array},
        format: {type: Array},
        delegat: {type: String},
        status: {type: String}
    }
)

export default mongoose.model('Takmicenje', Takmicenje, 'takmicenje');