import express from 'express';
import { SportController } from '../controllers/sport.controller';
//import { SportistaController } from '../controllers/sportista.controller';
//import { KorisnikController } from '../controllers/korisnik.controller';

const sportRouter = express.Router();

sportRouter.route('/dohvatiSveSportove').get(
    (req, res)=> new SportController().dohvatiSveSportove(req, res)
)

export default sportRouter;