export function checkRequiredProperties(){
    if(process.env.PROD) {
        if (!process.env.DB_URL) {
            throw new Error("process.env.DB_URL");
        }
    }
}

checkRequiredProperties();

export let properties = {
    DB_URL: process.env.DB_URL ? process.env.DB_URL : "https://app.axolotis.com/service/room",
};
