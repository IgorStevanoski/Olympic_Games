import express from 'express'
import KorisnickiZahtev from '../models/korisnickiZahtev';
import Korisnik from '../models/korisnik';

export class KorisnikController {
    prijavaNaSistem = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        Korisnik.findOne({ 'kor_ime': kor_ime, 'lozinka': lozinka }, (err, korisnik) => {
            if (err) console.log(err);
            else res.json(korisnik)
        })
    }

    registruj = (req: express.Request, res: express.Response) => {
       // let korisnik = new Korisnik(req.body);
        let korisnickiZahtev = new KorisnickiZahtev(req.body);
        let kor_ime = req.body.kor_ime;

        Korisnik.findOne({ 'kor_ime': kor_ime }, (err, kor) => {
            if (kor) {
                res.json({ 'message': 'neuspeh' });
            } else {
                KorisnickiZahtev.findOne({ 'kor_ime': kor_ime }, (err, kor) => {
                    if (kor) {
                        res.json({ 'message': 'postoji' });
                    } else {
                        korisnickiZahtev.save().then((korisnickiZahtev) => {
                            res.status(200).json({ 'message': 'uspeh' });
                        }).catch((err) => {
                            res.status(400).json({ 'message': err });
                        });
                    }
                })
            }
        })
    }

    dohvatiZahteve = (req: express.Request, res: express.Response) => {
        KorisnickiZahtev.find({}, (err, zahtevi) => {
            if (err) console.log(err);
            else res.json(zahtevi)
        })
    }

    odobriZahtev = (req: express.Request, res: express.Response) => {
        let korisnik = new Korisnik(req.body);

        korisnik.save().then((korisnik) => {
            res.status(200).json({ 'message': 'uspeh' });
        }).catch((err) => {
            res.status(400).json({ 'message': err });
        });
    }

    odbaciZahtev = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        try {
            KorisnickiZahtev.collection.deleteOne( { 'kor_ime' : kor_ime } );
            res.json({ 'message': 'uspeh' });
         } catch (e) {
            console.log(e);
         }
    }

    promeniSifru = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
        let lozinkaNova = req.body.lozinkaNova;

        console.log(kor_ime)
        console.log(lozinka)
        console.log(lozinkaNova)

        Korisnik.findOne({ 'kor_ime': kor_ime, 'lozinka': lozinka }, (err, korisnik) => {
            if (korisnik) {
                Korisnik.collection.updateOne({ 'kor_ime': kor_ime },
                    { $set: { 'lozinka': lozinkaNova } });
                res.json({ 'message': 'uspeh' });
            } else {
                console.log(err);
                res.json({ 'message': 'neuspeh' });
            }
        })
    }

    dohvatiDelegate = (req: express.Request, res: express.Response) => {
        Korisnik.find({'tip': 'delegat'}, (err, korisnici) => {
            if (err) console.log(err);
            else res.json(korisnici);
        })
    }

    dohvatiVodje = (req: express.Request, res: express.Response) => {
        Korisnik.find({'tip': 'vodja nacionalne delegacije'}, (err, korisnici) => {
            if (err) console.log(err);
            else res.json(korisnici);
        })
    }

    azurirajBrojTakmicenjaDelegata = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;

        Korisnik.findOne({ 'ime': ime, 'prezime': prezime }, (err, korisnik) => {
            if (korisnik) {
                Korisnik.collection.updateOne({ 'ime': ime, 'prezime': prezime },
                    { $inc: { 'broj_takmicenja': 1} });
                res.json({ 'message': 'uspeh' });
            } else {
                console.log(err);
                res.json({ 'message': 'neuspeh' });
            }
        })
    }

}

/* if (err) {
    res.json({ 'message': 'neuspeh' });
    console.log(err);
}
else {
    Korisnik.collection.updateOne({ 'kor_ime': kor_ime },
        { $set: { 'lozinka': lozinkaNova } });
    res.json({ 'message': 'uspeh' });
} */