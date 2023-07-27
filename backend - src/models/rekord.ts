import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rekord = new Schema(
    {
        godina: { type: String},
        mesto: { type: String},
        disciplina: { type: String},
        sportista: { type: String},
        zemlja: { type: String},
        rekord: { type: String},
    }
)

export default mongoose.model('Rekord', Rekord, 'rekord');