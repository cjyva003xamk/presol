import express from 'express';

export class Virhe extends Error {
    status: number
    viesti: string
    constructor(status?: number, viesti?: string) {
        super();
        this.status = status || 500;
        this.viesti = viesti || "Palvelimella tapahtui odottamaton virhe";
    }

}

const virhekasittelija = (err: Virhe, req: express.Request, res: express.Response, next: express.NextFunction) => {

    if (err.status >= 100 && err.status < 600)
        res.status(err.status).json({ virhe: err.viesti });
    else
        res.status(500).json({ virhe: err.viesti });

    next();

}

export default virhekasittelija;