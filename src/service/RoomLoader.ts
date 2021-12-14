import axios from "axios";
import {properties} from "@root/properties/properties";

export default class RoomLoader {
    async loadRoomHtml(sid:string):Promise<{head:string,body:string}>{
        return {
            head:'<meta name="axolotis:custom" content="custom meta or scrypt or css">',
            body:""
        };
    }

    async loadRoom(sid:string):Promise<string>{
        return JSON.stringify(await this.loadRoomJson(sid));
    }
    async loadRoomJson(sid:string):Promise<any>{
        try {
            return (await axios.get(properties.DB_URL + "/room/" + sid)).data
        }catch (e) {
            //default room
            let roomData={
                "entities": [
                    {
                        "type": "ecs-component-loader",
                        "module": "@root/modules/scenes/demo2/Sky2"
                    },
                    {
                        "type": "ecs-component-loader",
                        "module": "@root/modules/spoke/SpokeRoomLoader",
                        "config": {
                            "room": "yUXD7A2"
                        }
                    },
                    {
                        "type": "ecs-component-loader",
                        "module": "@root/modules/controller/pathFindingPlayer/NavMeshPlayer",
                        "config": {
                            "position": {
                                "x": 0,
                                "y": 1,
                                "z": 0
                            }
                        }
                    }
                ]
            };
            return roomData;
        }
    }
}
