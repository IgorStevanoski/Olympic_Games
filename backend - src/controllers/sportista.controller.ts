import express from 'express'
import Zemlja from '../models/Zemlja';
import Korisnik from '../models/korisnik';
import Sportista from '../models/sportista';

export class SportistaController {

    dohvatiSportistePoKriterijumu = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let medalja = req.body.medalja;
        let pol = req.body.pol;

        if (prezime == "" && ime != "") {
            if (medalja == true) {
                Sportista.find({
                    'zemlja': { $regex: zemlja }, 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina },
                    'pol': { $regex: pol }, 'medalja': medalja,
                    $or: [{ 'ime': { $regex: ime } }, { 'prezime': { $regex: ime } }]
                },
                    (err, sportisti) => {
                        if (err) console.log(err);
                        else res.json(sportisti)
                    })
            } else {
                Sportista.find({
                    'zemlja': { $regex: zemlja }, 'sport': { $regex: sport }, 'disciplina': { $regex: disciplina },
                    'pol': { $regex: pol },
                    $or: [{ 'ime': { $regex: ime } }, { 'prezime': { $regex: ime } }]
                },
                    (err, sportisti) => {
                        if (err) console.log(err);
                        else res.json(sportisti)
                    })
            }
        } else
            Sportista.find({
                'ime': { $regex: ime }, 'prezime': { $regex: prezime }, 'zemlja': { $regex: zemlja },
                'sport': { $regex: sport }, 'disciplina': { $regex: disciplina },
                'pol': { $regex: pol }, $or: [{ 'medalja': true }, { 'medalja': medalja }]
            }, (err, sportisti) => {
                if (err) console.log(err);
                else res.json(sportisti)
            })

    }

    dohvatiBrojSportistaZemlje = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;

        Sportista.find({ 'zemlja': zemlja }, (err, sportisti) => {
            if (err) console.log(err);
            else res.json(sportisti.length)
        })
    }

    dohvatiBrojRazlicitihSportistaZemlje = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;

        Sportista.collection.distinct('ime', { 'zemlja': zemlja }, (err, sportisti) => {
            if (err) console.log(err);
            else res.json(sportisti.length)
        })
    }

    dohvatiBrojRazlicitihSportistaPoKriterijumu = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        
        Sportista.collection.distinct('prezime', { 'zemlja': zemlja, 'sport': { $regex: sport }, 
        'disciplina': { $regex: disciplina }, }, (err, sportisti) => {
            if (err) console.log(err);
            else res.json(sportisti.length)
        })
    }

    proveriSportistu = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;

        Sportista.find({ 'ime': ime, 'prezime': prezime }, (err, sportisti) => {
            if (err) console.log(err);
            else res.json(sportisti);
        })
    }

    prijaviSportistu = (req: express.Request, res: express.Response) => {
        let sportista = new Sportista(req.body);

        sportista.save().then((sportista) => {
            res.status(200).json({ 'message': 'uspeh' });
        }).catch((err) => {
            res.status(400).json({ 'message': err });
        });
    }

}