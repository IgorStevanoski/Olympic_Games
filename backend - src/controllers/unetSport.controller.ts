import express from 'express'
import Zemlja from '../models/Zemlja';
import Korisnik from '../models/korisnik';
import Sportista from '../models/sportista';
import Sport from '../models/sport';
import UnetSport from '../models/unetSport';

export class UnetSportController {

    dohvatiSveUneteSportove = (req: express.Request, res: express.Response) => {
        UnetSport.find({}, (err, sportovi) => {
            if (err) console.log(err);
            else res.json(sportovi);
        })
    }

    unesiSport = (req: express.Request, res: express.Response) => {
        let unetSport = new UnetSport(req.body);
        let ime = req.body.ime;

        UnetSport.findOne({ 'ime': ime }, (err, sport) => {
            if (sport) {
                res.json({ 'message': 'postoji' });
            } else {
                unetSport.save().then((unetSport) => {
                    res.status(200).json({ 'message': 'uspeh' });
                }).catch((err) => {
                    res.status(400).json({ 'message': err });
                });
            }
        })
    }

    unesiDisciplinu = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let disciplina = req.body.disciplina;
        let min = req.body.min;
        let max  = req.body.max;
        let tip = req.body.tip;

        UnetSport.findOne({ 'ime': ime, 'discipline.disciplina': disciplina }, (err, sport) => {
            if (sport) {
                res.json({ 'message': 'postoji' });
            } else {
                let disc = {
                    disciplina: disciplina,
                    min : min,
                    max : max,
                    tip : tip
                }
                UnetSport.collection.updateOne({ 'ime': ime },
                    { $push: { "discipline": disc } });
                res.json({ 'message': 'uspeh' });
            }
        })
    }

}

/* kupiProizvod = (req: express.Request, res: express.Response)=>{
    let naziv = req.body.naziv;
    let kor_ime = req.body.kor_ime;

    //console.log(naziv);
    //console.log(kor_ime);

    Proizvod.collection.updateOne({'naziv': naziv}, {$inc: {'kolicina':-1}});
    Korisnik.findOne({'kor_ime': kor_ime, 'proizvodi.naziv': naziv}, (err, korisnikJeKupovaoProizvod)=>{
        if(err) console.log(err);
        else{
            if(korisnikJeKupovaoProizvod){
                //updejt kolicina
                Korisnik.collection.updateOne(
                    {'kor_ime': kor_ime, 'proizvodi.naziv': naziv},
                    {$inc: {'proizvodi.$.kolicina': 1}});
            }
            else{
                //dodaj novi objekat
                let kupovina={
                    naziv: naziv,
                    kolicina: 1
                }
                Korisnik.collection.updateOne({'kor_ime': kor_ime},
                {$push: {"proizvodi": kupovina}});
            }
            res.json({poruka: 'ok'});
        }
    })
} */