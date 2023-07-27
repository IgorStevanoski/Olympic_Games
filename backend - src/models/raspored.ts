import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Raspored = new Schema(
    {
        takmicenje: { type: Object },
        desavanja: { type: Array },
        desavanje: { type: Object }
    }
)

export default mongoose.model('Raspored', Raspored, 'raspored');