import mongoose from 'mongoose';
import Zemlja from './Zemlja';

const Schema = mongoose.Schema;

let Sportista = new Schema(
    {
        ime: { type: String },
        prezime: { type: String },
        zemlja: { type: String },
        sport: { type: String },
        disciplina: { type: String },
        medalja: { type: Boolean },
        pol: { type: String },
    }
)

export default mongoose.model('Sportista', Sportista, 'sportista');