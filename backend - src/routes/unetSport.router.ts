import express from 'express';
import { UnetSportController } from '../controllers/unetSport.controller';
import { SportController } from '../controllers/sport.controller';
//import { SportistaController } from '../controllers/sportista.controller';
//import { KorisnikController } from '../controllers/korisnik.controller';

const unetSportRouter = express.Router();

unetSportRouter.route('/dohvatiSveUneteSportove').get(
    (req, res)=> new UnetSportController().dohvatiSveUneteSportove(req, res)
)

unetSportRouter.route('/unesiSport').post(
    (req, res)=> new UnetSportController().unesiSport(req, res)
)

unetSportRouter.route('/unesiDisciplinu').post(
    (req, res)=> new UnetSportController().unesiDisciplinu(req, res)
)

export default unetSportRouter;