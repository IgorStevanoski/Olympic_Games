import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let UnetSport = new Schema(
    {
        ime: { type: String },
        discipline: { type: Array }
    }
)

export default mongoose.model('UnetSport', UnetSport, 'unetSport');