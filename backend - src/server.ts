import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import korisnikRouter from './routes/korisnik.routes';
import zemljaRouter from './routes/zemlja.routes';
import sportistaRouter from './routes/sportista.router';
import sportRouter from './routes/sport';
import unetSportRouter from './routes/unetSport.router';
import takmicenjeRouter from './routes/takmicenje.routes';
import lokacijaRouter from './routes/lokacija.router';
import ekipaRouter from './routes/ekipa.routes';
import rekordRouter from './routes/rekord.routes';
import rasporedRouter from './routes/raspored.router';
//import korisnikRouter from './routes/korisnik.routes';
//import proizvodiRouter from './routes/proizvod.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/olimpijada");
const conn = mongoose.connection;
conn.once('open', ()=>{
    console.log("Konekcija sa bazom je uspesna");
})

const router = express.Router();
router.use('/korisnik', korisnikRouter );
router.use('/zemlja', zemljaRouter );
router.use('/sportista', sportistaRouter );
router.use('/sport', sportRouter );
router.use('/unetSport', unetSportRouter );
router.use('/takmicenje', takmicenjeRouter );
router.use('/lokacija', lokacijaRouter );
router.use('/ekipa', ekipaRouter );
router.use('/rekord', rekordRouter );
router.use('/raspored', rasporedRouter );

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));