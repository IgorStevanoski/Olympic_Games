import express from 'express';
import { RekordController } from '../controllers/rekord.controller';

const rekordRouter = express.Router();

rekordRouter.route('/dohvatiSveRekorde').get(
    (req, res)=> new RekordController().dohvatiSveRekorde(req, res)
)

export default rekordRouter;