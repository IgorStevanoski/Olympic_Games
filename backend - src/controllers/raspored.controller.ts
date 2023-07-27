import express from 'express'
import Zemlja from '../models/Zemlja';
import Korisnik from '../models/korisnik';
import Sportista from '../models/sportista';
import Sport from '../models/sport';
import Takmicenje from '../models/takmicenje';
import Raspored from '../models/raspored';
import Desavanje from '../models/desavanje';

export class RasporedController {

    unesiRasporedZaTakmicenje = (req: express.Request, res: express.Response) => {
        let raspored = new Raspored(req.body);

        raspored.save().then((raspored) => {
            res.status(200).json({ 'message': 'uspeh' });
        }).catch((err) => {
            res.status(400).json({ 'message': err });
        });
    }

    dohvatiSveRasporede = (req: express.Request, res: express.Response) => {

        Raspored.find({}, (err, rasporedi) => {
            if (err) console.log(err);
            else res.json(rasporedi);
        })
    }

    unesiDesavanjeURaspored = (req: express.Request, res: express.Response) => {
        let desavanje = new Desavanje(req.body);
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Raspored.collection.updateOne({ 'takmicenje.sport': sport, 
        'takmicenje.disciplina': disciplina, 'takmicenje.pol': pol },
            { $push: { "desavanja": desavanje } });
        res.json({ 'message': 'uspeh' });
    }

    unesiVreme = (req: express.Request, res: express.Response) => {
        let vreme = req.body.vreme;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        console.log(vreme);

        Raspored.collection.updateOne({ 'takmicenje.sport': sport, 
        'takmicenje.disciplina': disciplina, 'takmicenje.pol': pol },
            { $set: { "desavanje.vremePocetka": vreme } });
        res.json({ 'message': 'uspeh' });
    }

    unesiRezultate = (req: express.Request, res: express.Response) => {
        // rezultati se unose tako sto se zameni celo desavanje sa desavanjem koje je popunjeno
        let desavanje = req.body.desavanje;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Raspored.collection.updateOne({ 'takmicenje.sport': sport, 
        'takmicenje.disciplina': disciplina, 'takmicenje.pol': pol },
            { $set: { "desavanje": desavanje } });
        res.json({ 'message': 'uspeh' });
    }

}
/*
let disc = {
    disciplina: disciplina
}
UnetSport.collection.updateOne({ 'ime': ime },
    { $push: { "discipline": disc } });
res.json({ 'message': 'uspeh' }); */