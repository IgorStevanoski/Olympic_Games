import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Lokacija = new Schema(
    {
        ime: { type: String }
    }
)

export default mongoose.model('Lokacija', Lokacija, 'lokacija');