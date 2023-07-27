import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zemlja = new Schema(
    {
        ime: { type: String },
        zlatneMedalje: { type: Number },
        srebrneMedalje: { type: Number },
        bronzaneMedalje: { type: Number },
    }
)

export default mongoose.model('Zemlja', Zemlja, 'zemlja');