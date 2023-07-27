import express from 'express';
import { TakmicenjeController } from '../controllers/takmicenje.controller';
import { KorisnikController } from '../controllers/korisnik.controller';

const takmicenjeRouter = express.Router();

takmicenjeRouter.route('/unesiTakmicenje').post(
    (req, res)=> new TakmicenjeController().unesiTakmicenje(req, res)
)

takmicenjeRouter.route('/dohvatiSvaTakmicenja').post(
    (req, res)=> new TakmicenjeController().dohvatiSvaTakmicenja(req, res)
)

takmicenjeRouter.route('/unesiSportistuUTakmicenje').post(
    (req, res)=> new TakmicenjeController().unesiSportistuUTakmicenje(req, res)
)

takmicenjeRouter.route('/unesiDelegataUTakmicenje').post(
    (req, res)=> new TakmicenjeController().unesiDelegataUTakmicenje(req, res)
)

takmicenjeRouter.route('/unesiEkipuUTakmicenje').post(
    (req, res)=> new TakmicenjeController().unesiEkipuUTakmicenje(req, res)
)

takmicenjeRouter.route('/zapocniTakmicenje').post(
    (req, res)=> new TakmicenjeController().zapocniTakmicenje(req, res)
)

/*korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res)=> new KorisnikController().dohvatiKorisnika(req, res)
)*/

export default takmicenjeRouter;