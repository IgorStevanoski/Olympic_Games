import express from 'express';
import { TakmicenjeController } from '../controllers/takmicenje.controller';
import { KorisnikController } from '../controllers/korisnik.controller';
import { RasporedController } from '../controllers/raspored.controller';

const rasporedRouter = express.Router();

rasporedRouter.route('/dohvatiSveRasporede').get(
    (req, res)=> new RasporedController().dohvatiSveRasporede(req, res)
)

rasporedRouter.route('/unesiRasporedZaTakmicenje').post(
    (req, res)=> new RasporedController().unesiRasporedZaTakmicenje(req, res)
)

rasporedRouter.route('/unesiDesavanjeURaspored').post(
    (req, res)=> new RasporedController().unesiDesavanjeURaspored(req, res)
)

rasporedRouter.route('/unesiVreme').post(
    (req, res)=> new RasporedController().unesiVreme(req, res)
)

rasporedRouter.route('/unesiRezultate').post(
    (req, res)=> new RasporedController().unesiRezultate(req, res)
)


export default rasporedRouter;