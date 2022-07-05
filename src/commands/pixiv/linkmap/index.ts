import fs from 'fs';
import upath from 'upath';

var linkmap: any = JSON.parse(fs.readFileSync(upath.join(__dirname, "map.json"), { encoding: "utf-8", flag: "r" }));

export function isInDatabase(illustID: string): boolean {
    if (linkmap.hasOwnProperty(illustID)) {
        return true;
    } else {
        return false;
    }
}

export function getLink(illustID: string): string {
    if (isInDatabase(illustID)) {
        return linkmap[illustID];
    } else {
        return "";
    }
}

export function addLink(illustID: string, illustLink: string): void {
    linkmap[illustID] = illustLink;
}

export function saveLink() {
    fs.writeFile(upath.join(__dirname, "map.json"), JSON.stringify(linkmap), (err) => {
        if (err) console.log(err);
        else console.log(`[${new Date().toLocaleTimeString()}] saved "linkmap.json"`);
    });
}