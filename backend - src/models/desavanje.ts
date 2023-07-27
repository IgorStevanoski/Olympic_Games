import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Desavanje = new Schema(
    {
        vremePocetka: { type: String},
        lokacija: { type: String},
        ucesnici: { type: Array},
        rezultat: { type: Array},
        brojKrugova: { type: Number},
        status: { type: String}
    }
)

export default mongoose.model('Desavanje', Desavanje, 'desavanje');