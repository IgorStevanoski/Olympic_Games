import express from 'express'
import Zemlja from '../models/Zemlja';
import Korisnik from '../models/korisnik';

export class ZemljaController {
    
    dohvatiSveZemlje = (req: express.Request, res: express.Response) => {

        Zemlja.find({}, (err, zemlje) => {
            if (err) console.log(err);
            else res.json(zemlje)
        })
    }

}