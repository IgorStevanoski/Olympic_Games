import express from 'express'
import Zemlja from '../models/Zemlja';
import Korisnik from '../models/korisnik';
import Sportista from '../models/sportista';
import Sport from '../models/sport';
import Takmicenje from '../models/takmicenje';

export class TakmicenjeController {

    unesiTakmicenje = (req: express.Request, res: express.Response) => {
        let takmicenje = new Takmicenje(req.body);
        let disciplina = req.body.disciplina;
        let sport = req.body.sport;

        Takmicenje.findOne({ 'disciplina': disciplina, 'sport': sport }, (err, tak) => {
            if (tak) {
                res.json({ 'message': 'postoji' });
            } else {
                takmicenje.save().then((takmicenje) => {
                    res.status(200).json({ 'message': 'uspeh' });
                }).catch((err) => {
                    res.status(400).json({ 'message': err });
                });
            }
        });
    }

    dohvatiSvaTakmicenja = (req: express.Request, res: express.Response) => {
        let status = req.body.status;

        Takmicenje.find({ 'status': { $regex: status }}, (err, takmicenja) => {
            if (err) console.log(err);
            else res.json(takmicenja);
        })
    }

    unesiSportistuUTakmicenje = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let ime_i_prezime = ime + " " + prezime;

        let pod = {
            takmicar: ime_i_prezime,
            rezultat: "/"
        }
        Takmicenje.collection.updateOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol },
            { $push: { "takmicari": pod } });
        res.json({ 'message': 'uspeh' });
    }

    unesiEkipuUTakmicenje = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let zemlja = req.body.zemlja

        let pod = {
            takmicar: zemlja,
            rezultat: '/'
        }
        Takmicenje.collection.updateOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol },
            { $push: { "takmicari": pod } });
        res.json({ 'message': 'uspeh' });
    }

    unesiDelegataUTakmicenje = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let ime_i_prezime = ime + " " + prezime;

        Takmicenje.collection.updateOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol },
            { $set: { "delegat": ime_i_prezime } });
        res.json({ 'message': 'uspeh' });
    }

    zapocniTakmicenje = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Takmicenje.collection.updateOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol },
            { $set: { "status": 'zapoceto' } });
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