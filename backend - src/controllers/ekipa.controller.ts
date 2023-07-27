import express from 'express'
import Zemlja from '../models/Zemlja';
import Korisnik from '../models/korisnik';
import Sportista from '../models/sportista';
import Ekipa from '../models/ekipa';

export class EkipaController {

    dohvatiSveEkipe = (req: express.Request, res: express.Response) => {
        Ekipa.find({}, (err, ekipe) => {
            if (err) console.log(err);
            else res.json(ekipe);
        })
    }

    dohvatiEkipePoKriterijumu = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Ekipa.find({
            'zemlja': { $regex: zemlja }, 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina },
            'pol': { $regex: pol }
        },
            (err, ekipe) => {
                if (err) console.log(err);
                else res.json(ekipe)
            })
    }

    unesiEkipu = (req: express.Request, res: express.Response) => {
        let ekipa = new Ekipa(req.body);

        ekipa.save().then((ekipa) => {
            res.status(200).json({ 'message': 'uspeh' });
        }).catch((err) => {
            res.status(400).json({ 'message': err });
        });
    }

}


