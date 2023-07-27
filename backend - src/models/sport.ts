import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sport = new Schema(
    {
        ime: { type: String },
        discipline: { type: Array }
    }
)

export default mongoose.model('Sport', Sport, 'sport');