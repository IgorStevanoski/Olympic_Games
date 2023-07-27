import express from 'express';
import { SportistaController } from '../controllers/sportista.controller';
//import { KorisnikController } from '../controllers/korisnik.controller';

const sportistaRouter = express.Router();

sportistaRouter.route('/dohvatiSportistePoKriterijumu').post(
    (req, res)=> new SportistaController().dohvatiSportistePoKriterijumu(req, res)
)

sportistaRouter.route('/dohvatiBrojSportistaZemlje').post(
    (req, res)=> new SportistaController().dohvatiBrojSportistaZemlje(req, res)
)

sportistaRouter.route('/dohvatiBrojRazlicitihSportistaZemlje').post(
    (req, res)=> new SportistaController().dohvatiBrojRazlicitihSportistaZemlje(req, res)
)

sportistaRouter.route('/dohvatiBrojRazlicitihSportistaPoKriterijumu').post(
    (req, res)=> new SportistaController().dohvatiBrojRazlicitihSportistaPoKriterijumu(req, res)
)

sportistaRouter.route('/proveriSportistu').post(
    (req, res)=> new SportistaController().proveriSportistu(req, res)
)

sportistaRouter.route('/prijaviSportistu').post(
    (req, res)=> new SportistaController().prijaviSportistu(req, res)
)

export default sportistaRouter;