import fs from "fs";
import RoomLoader from "@root/service/RoomLoader";

export default class RoomPageCreator {

    roomLoader:RoomLoader = new RoomLoader();

    async findCodeImport():Promise<string>{
        return new Promise((resolve, reject) => {
            fs.readFile('public/room.html', 'utf8', (err,data) => {
                if (err) {
                    reject(err);
                }else {
                    let lines = data.replace("\r","").split("\n");
                    for (const line of lines) {
                        if (line.indexOf("<script defer=\"defer\" src=\"")!== -1) {
                            resolve(line.replace("</head>", ""));
                        }
                    }
                }
            });
        })
    }

    async loadTemplate(url:string):Promise<string>{
        return new Promise((resolve, reject) => {
            fs.readFile(url, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(data);
                }
            });
        });
    }

    async createHead(sid:string,roomData:any,roomHtml){
        let ret = "";
        ret += await this.findCodeImport();
        ret += "\n"+'<meta name="axolotis:room" content="room/'+sid+'/room.json">';
        if(roomData.preload) {
            for (const preload of roomData.preload) {
                let type = (preload.endsWith(".jpeg") || preload.endsWith(".jpg") || preload.endsWith(".gif")) ? "image" : "fetch";
                ret += "\n" + '<link rel="preload" href="' + preload + '" as="' + type + '" crossorigin="anonymous">'
            }
        }
        ret+="\n"+(roomHtml.head || "");
        return ret;
    }

    async createRoom(sid:string):Promise<string>{
        let roomData = await this.roomLoader.loadRoomJson(sid);
        let roomHtml = await this.roomLoader.loadRoomHtml(sid);
        //open room.html page
        // open template page
        // compose new page
        // add meta
        // add preload
        let template = await this.loadTemplate('src/loader-template/loader-black-default.html');
        let head = await this.createHead(sid,roomData,roomHtml);
        template = template.replace("%TITLE%",roomData.name || "room");
        template = template.replace("%HEAD%",head || "room");
        template = template.replace("%BODY%",roomHtml.body || "");
        return template;
    }
}
