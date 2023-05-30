import express from "express";
import busboy from "busboy";
import fs from "fs";
import { parse } from "csv-parse";
import path from "path";
import { Prisma, PrismaClient } from "@prisma/client";
import { Virhe } from "../errors/virhekasittelija";

const prisma: PrismaClient = new PrismaClient();

const apiJourneyRouter: express.Router = express.Router();

apiJourneyRouter.use(express.json());

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
        console.log("luettava tiedosto on: " + savedTo)
        const dbConnection = fs.createReadStream(savedTo)
        dbConnection.pipe(parse({ delimiter: ',', from_line: 2, to_line: 20000 }))
            .on('data', async function (row) {
                if (row[6] > 10 && row[7] > 10) {
                    try {
                        await prisma.journey.create({
                            data: {
                                departure: row[0],
                                return: row[1],
                                departureStationId: Number(row[2]),
                                departureStationName: row[3],
                                returnStationId: Number(row[4]),
                                returnStationName: row[5],
                                coveredDistance: Number(row[6]),
                                duration: Number(row[7]),
                            },
                        })
                    } catch (e: any) { console.log(e), prisma.$disconnect() };
                }
            })
            .on("end", function () {
                console.log("finished");
            })
            .on("error", function (error) {
                console.log(error.message);
            })
            .on("close", function () {
                console.log("Finished reading file")
            });
    });
    bb.on('close', () => {
        res.writeHead(200, { 'Connection': 'close' });
        res.end(`Data has been successfully uploaded!`);
    });
    req.pipe(bb);
    return;
});

apiJourneyRouter.get("/slider", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        if (typeof req.query.hakusana === "string" && String(req.query.hakusana).length > 0) {
            let hakusana: string = `%${req.query.hakusana}%`;
            let haettava: string = String(req.query.haettava);
            let alaraja: number = Number(req.query.alaraja);
            let ylaraja: number = Number(req.query.ylaraja);

            let merkit = await prisma.$queryRaw`SELECT * FROM journey WHERE
                ${(haettava === "departureStation") ? Prisma.sql` departureStationName LIKE ${hakusana} AND coveredDistance BETWEEN ${alaraja} AND ${ylaraja}` :
                    (haettava === "returnStation") ? Prisma.sql` returnStationName LIKE ${hakusana} AND coveredDistance BETWEEN ${alaraja} AND ${ylaraja}` :
                        Prisma.empty
                }                                                    
                                                    LIMIT 41`;
            res.json(merkit);
        } else {
            let alaraja: number = Number(req.query.alaraja);
            let ylaraja: number = Number(req.query.ylaraja);

            let merkit = await prisma.$queryRaw`SELECT * FROM journey WHERE coveredDistance BETWEEN ${alaraja} AND ${ylaraja}                                                    
                                                    LIMIT 41`;
            res.json(merkit);
        }
    } catch (e: any) {
        next(new Virhe());
    }

});

apiJourneyRouter.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        if (typeof req.query.hakusana === "string" && String(req.query.hakusana).length > 0) {
            let hakusana: string = `%${req.query.hakusana}%`;
            let haettava: string = String(req.query.haettava);

            let merkit = await prisma.$queryRaw`SELECT * FROM journey WHERE
                ${(haettava === "departureStation") ? Prisma.sql` departureStationName LIKE ${hakusana}` :
                    (haettava === "returnStation") ? Prisma.sql` returnStationName LIKE ${hakusana}` :
                        Prisma.empty
                }                                                    
                                                    LIMIT 41`;
            res.json(merkit);
        } else {
            let merkit = await prisma.$queryRaw`SELECT * FROM journey                                                    
                                                    LIMIT 41`;
            res.json(merkit);
        }
    } catch (e: any) {
        next(new Virhe());
    }
});

apiJourneyRouter.get("/stations", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        if (typeof req.query.hakusana === "string" && String(req.query.hakusana).length > 0) {

            let hakusana: string = `%${req.query.hakusana}%`;

            let stations = await prisma.$queryRaw`SELECT DISTINCT departureStationName FROM journey  
            WHERE departureStationName LIKE ${hakusana}                                       
            ORDER BY departureStationName asc `;

            res.json(stations);
        } else {
            let stations = await prisma.$queryRaw`SELECT DISTINCT departureStationName FROM journey                                         
            ORDER BY departureStationName asc `;

            res.json(stations);
        }
    } catch (e: any) {
        next(new Virhe());
    }
});

export default apiJourneyRouter;