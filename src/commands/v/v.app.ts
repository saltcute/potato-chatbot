import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';
import fs from 'fs';
import upath from 'upath';

const data = JSON.parse(fs.readFileSync(upath.join(__dirname, "quotes.json"), { encoding: "utf-8", "flag": "r" }));

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

class V extends AppCommand {
    code = 'v'; // 只是用作标记
    trigger = 'v'; // 用于触发的文字
    intro = 'v';
    func: AppFunc<BaseSession> = async (session) => {
        return session.quote(data[getRandomInt(data.length)]);
    };
}

export const v = new V();
