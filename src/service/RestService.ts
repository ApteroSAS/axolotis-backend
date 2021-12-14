import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import RoomPageCreator from "@root/service/RoomPageCreator";
import RoomLoader from "@root/service/RoomLoader";

export class RestService {
    roomLoader:RoomLoader = new RoomLoader();
    roomCreator:RoomPageCreator = new RoomPageCreator();
    constructor(private expressApp,private buildVersion) {
        this.setupApi();
    }

    setupApi() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cors());
        // Parse JSON and form HTTP bodies
        this.expressApp.use(bodyParser.urlencoded({extended: true}));

        let router = express.Router();

        let apiVersion = "1.0.0";//increment this each time you change the api and break the backward compatibility (semver)
        router.get('/api/version', (req, res) => {
            res.json({apiVersion:apiVersion,buildVersion:this.buildVersion});
        });

        router.get('/room/:sid/room.json', async (req, res) => {
            const sid = req.params.sid;
            this.roomLoader.loadRoomJson(sid).then((resData) => {
                res.json(resData);
            }).catch(err => {
                console.error(err);
                res.status(500).json(err);
            })
        });

        router.get('/room/:sid', async (req, res) => {
            const sid = req.params.sid;
            try {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(await this.roomCreator.createRoom(sid));
                res.end();
            } catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
        });

        this.expressApp.use('/', router);
    }

}
