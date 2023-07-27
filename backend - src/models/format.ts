import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Format = new Schema(
    {
        brojTakmicaraMAX: { type: Number},
        brojTakmicaraMIN: { type: Number},
        brojKrugova: { type: Number},
        rezultat: { type: String},
        tip: {type: String}
    }
)

export default mongoose.model('Format', Format, 'format');