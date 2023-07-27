import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/prijavaNaSistem').post(
    (req, res)=> new KorisnikController().prijavaNaSistem(req, res)
)

korisnikRouter.route('/registruj').post(
    (req, res)=> new KorisnikController().registruj(req, res)
)

korisnikRouter.route('/promeniSifru').post(
    (req, res)=> new KorisnikController().promeniSifru(req, res)
)

korisnikRouter.route('/odobriZahtev').post(
    (req, res)=> new KorisnikController().odobriZahtev(req, res)
)

korisnikRouter.route('/odbaciZahtev').post(
    (req, res)=> new KorisnikController().odbaciZahtev(req, res)
)

korisnikRouter.route('/dohvatiDelegate').get(
    (req, res)=> new KorisnikController().dohvatiDelegate(req, res)
)

korisnikRouter.route('/dohvatiVodje').get(
    (req, res)=> new KorisnikController().dohvatiVodje(req, res)
)

korisnikRouter.route('/azurirajBrojTakmicenjaDelegata').post(
    (req, res)=> new KorisnikController().azurirajBrojTakmicenjaDelegata(req, res)
)

korisnikRouter.route('/dohvatiZahteve').get(
    (req, res)=> new KorisnikController().dohvatiZahteve(req, res)
)

/*korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res)=> new KorisnikController().dohvatiKorisnika(req, res)
)*/

export default korisnikRouter;