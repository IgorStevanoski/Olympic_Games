import express from 'express';
import { LokacijaController } from '../controllers/lokacija.controller';

const lokacijaRouter = express.Router();

lokacijaRouter.route('/dohvatiSveLokacije').get(
    (req, res)=> new LokacijaController().dohvatiSveLokacije (req, res)
)

export default lokacijaRouter;