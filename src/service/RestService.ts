import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

export class RestService {

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

        router.get('/room/:sid', async (req, res) => {
            //open room.html page
            // open template page
            // compose new page
            // add meta
            // add preload
            fs.readFile('/etc/hosts', 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                }
                console.log(data);
            });
            const sid = req.params.sid;
            try {
                var body = "<html>" +
                "<head>" +
                "<meta http-equiv='Content-Type' content='text/html'" +
                "charset=UTF-8 />" +
                "</head>" +
                "<body>" +
                "<p>youve just created a page called </p>" +
                "</body>" +
                "</html>";
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(body);
                res.end();
            } catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
        });

        this.expressApp.use('/', router);
    }

}
