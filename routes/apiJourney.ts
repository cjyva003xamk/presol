import express from "express";
import busboy from "busboy";/* 
import http from "http"; */
import fs from "fs";
import { parse } from "csv-parse";
import path from "path";
import { Prisma, PrismaClient } from "@prisma/client";
import { Virhe } from "../errors/virhekasittelija";

const prisma: PrismaClient = new PrismaClient();

const apiJourneyRouter: express.Router = express.Router();

const insertInto = () => {

}

apiJourneyRouter.post("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const added = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    let savedTo = ""

    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        console.log(
            `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            filename,
            encoding,
            mimeType
        );
        const saveTo = path.join("./public/uploads", `upload-[${added}]-${filename}`);
        savedTo = saveTo;
        file.pipe(fs.createWriteStream(saveTo));

        fs.createReadStream(savedTo)
            .pipe(parse({ delimiter: ',', from_line: 2 }))
            .on('data', function (row) {
                if (row[6] < 10 && row[7] == 6) {
                    console.log(row);



                }
            })
            .on("end", function () {
                console.log("finished");
              })
              .on("error", function (error) {
                console.log(error.message);
              });
    });
    bb.on('close', () => {
        res.writeHead(200, { 'Connection': 'close' });
        res.end(`Data has been successfully uploaded!`);
    });
    req.pipe(bb);


    return;



    /* console.log(req.file?.filename, req.body);
    res.json(req.headers) */

    /* console.log(req.file, req.body); */
    /* try {

        if (typeof req.query.hakusana === "string" && String(req.query.hakusana).length > 0 && typeof req.query.haettava === "string" && String(req.query.haettava).length > 0) {

            let hakusana: string = `% ${req.query.hakusana} %`;
            let hakusana2: string = `% ${req.query.hakusana}`;
            let hakusana3: string = `${req.query.hakusana} %`;
            let haettava: string = String(req.query.haettava);

            let merkit = await prisma.$queryRaw`SELECT * FROM postimerkki WHERE
                ${(haettava === "asiasanat") ? Prisma.sql` asiasanat LIKE ${hakusana} OR asiasanat LIKE ${hakusana2}
                 OR asiasanat LIKE ${hakusana3}` :
                    (haettava === "taiteilija") ? Prisma.sql` taiteilija LIKE ${hakusana} OR taiteilija LIKE ${hakusana2}
                     OR taiteilija LIKE ${hakusana3}` :
                        (haettava === "merkinNimi") ? Prisma.sql` merkinNimi LIKE ${hakusana} OR merkinNimi LIKE ${hakusana2}
                         OR merkinNimi LIKE ${hakusana3}` :
                            Prisma.empty
                }
                                                    
                                                    LIMIT 41`;

            res.json(merkit);

        } else {
            next(new Virhe(400))
        }



    } catch (e: any) {
        next(new Virhe());
    } */

});
apiJourneyRouter.get("/slider", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    /* try {

        if (typeof req.query.hakusana === "string" && String(req.query.hakusana).length > 0 && typeof req.query.haettava === "string" && String(req.query.haettava).length > 0) {

            let hakusana: string = `% ${req.query.hakusana} %`;
            let hakusana2: string = `% ${req.query.hakusana}`;
            let hakusana3: string = `${req.query.hakusana} %`;
            let haettava: string = String(req.query.haettava);
            let alaraja: number = Number(req.query.alaraja);
            let ylaraja: number = Number(req.query.ylaraja);

            let merkit = await prisma.$queryRaw`SELECT * FROM postimerkki WHERE
                ${(haettava === "asiasanat") ? Prisma.sql` asiasanat LIKE ${hakusana} AND pvm BETWEEN ${alaraja} AND ${ylaraja} OR asiasanat LIKE ${hakusana2} AND pvm BETWEEN ${alaraja} AND ${ylaraja}  OR 
                asiasanat LIKE ${hakusana3} AND pvm BETWEEN ${alaraja} AND ${ylaraja} ` :
                    (haettava === "taiteilija") ? Prisma.sql` taiteilija LIKE ${hakusana} AND pvm BETWEEN ${alaraja} AND ${ylaraja}  OR taiteilija LIKE ${hakusana2} AND pvm BETWEEN ${alaraja} AND ${ylaraja}  OR 
                    taiteilija LIKE ${hakusana3} AND pvm BETWEEN ${alaraja} AND ${ylaraja} ` :
                        (haettava === "merkinNimi") ? Prisma.sql` merkinNimi LIKE ${hakusana} AND pvm BETWEEN ${alaraja} AND ${ylaraja}  OR merkinNimi LIKE ${hakusana2} AND pvm BETWEEN ${alaraja} AND ${ylaraja}  OR 
                        merkinNimi LIKE ${hakusana3} AND pvm BETWEEN ${alaraja} AND ${ylaraja} ` :
                            Prisma.empty
                }
                                                    
                                                    LIMIT 41`;

            res.json(merkit);

        } else {
            next(new Virhe(400))
        }



    } catch (e: any) {
        next(new Virhe());
    } */

});

export default apiJourneyRouter;