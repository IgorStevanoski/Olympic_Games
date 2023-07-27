import express from 'express';
import { EkipaController } from '../controllers/ekipa.controller';
//import { SportistaController } from '../controllers/sportista.controller';
//import { KorisnikController } from '../controllers/korisnik.controller';

const ekipaRouter = express.Router();

ekipaRouter.route('/dohvatiSveEkipe').get(
    (req, res)=> new EkipaController().dohvatiSveEkipe(req, res)
)

ekipaRouter.route('/dohvatiEkipePoKriterijumu').post(
    (req, res)=> new EkipaController().dohvatiEkipePoKriterijumu(req, res)
)

ekipaRouter.route('/unesiEkipu').post(
    (req, res)=> new EkipaController().unesiEkipu(req, res)
)

export default ekipaRouter;