import express from 'express';
import { ZemljaController } from '../controllers/zemlja.controller';
//import { KorisnikController } from '../controllers/korisnik.controller';

const zemljaRouter = express.Router();

zemljaRouter.route('/dohvatiSveZemlje').get(
    (req, res)=> new ZemljaController().dohvatiSveZemlje(req, res)
)

export default zemljaRouter;