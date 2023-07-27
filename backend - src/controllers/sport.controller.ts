import express from 'express'
import Zemlja from '../models/Zemlja';
import Korisnik from '../models/korisnik';
import Sportista from '../models/sportista';
import Sport from '../models/sport';

export class SportController {

    dohvatiSveSportove=(req: express.Request, res: express.Response)=>{
        Sport.find({},(err, sportovi)=>{
            if(err) console.log(err);
            else res.json(sportovi);
        })
    }

}