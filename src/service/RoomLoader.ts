
export default class RoomLoader {
    async loadRoomHtml(sid:string):Promise<{head:string,body:string}>{
        return {
            head:'<meta name="axolotis:custom" content="custom meta or scrypt or css">',
            body:"<div> hello </div>"
        };
    }

    async loadRoom(sid:string):Promise<string>{
        return JSON.stringify(await this.loadRoomJson(sid));
    }
    async loadRoomJson(sid:string):Promise<any>{
        let roomData={
            preload:[
                "assets/static/demo3/room.json",
                "https://alphahub.aptero.co/files/967334c9-4080-4c2d-9e77-9bf2ee37818d.glb",
                "assets/static/demo2/sky.jpg"
            ],
            "room": [
                {
                    "type": "ecs-component-loader",
                    "module": "@root/modules/scenes/demo2/Sky2"
                },
                {
                    "type": "ecs-component-loader",
                    "module": "@root/modules/scenes/demo3/SpokeRoomLoader",
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
