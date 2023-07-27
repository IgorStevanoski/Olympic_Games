import express from 'express'
import Rekord from '../models/rekord';

export class RekordController {

    dohvatiSveRekorde = (req: express.Request, res: express.Response) => {
        Rekord.find({}, (err, rekordi) => {
            if (err) console.log(err);
            else res.json(rekordi);
        })
    }

}