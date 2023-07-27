import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let KorisnickiZahtev = new Schema(
    {
        kor_ime: { type: String },
        lozinka: { type: String },
        ime: { type: String },
        prezime: { type: String },
        nacionalnost: { type: String },
        mejl: { type: String },
        tip: { type: String },
        broj_takmicenja: { type: Number}, // Samo za delegata
    }
)

export default mongoose.model('KorisnickiZahtev', KorisnickiZahtev, 'korisnickiZahtev');