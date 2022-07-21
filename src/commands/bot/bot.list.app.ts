import axios from 'axios';
import fs from 'fs';
import upath from 'upath'
import { AppCommand, AppFunc, BaseSession } from 'kbotify';

var tokenList: { [key: string]: string } = {};

tokenList = JSON.parse(fs.readFileSync(upath.join(__dirname, "tokenList.json"), { encoding: "utf-8", flag: "r" }));

class List extends AppCommand {
    code = 'list'; // 只是用作标记
    trigger = 'list'; // 用于触发的文字
    intro = 'Bot list';
    func: AppFunc<BaseSession> = async (session) => {
        var res: { [key: string]: string } = {};
        async function getList(token: string): Promise<string> {
            const tot = (await axios({
                url: "https://www.kookapp.cn/api/v3/guild/list",
                method: "GET",
                headers: {
                    'Authorization': `Bot ${token}`,
                }
            })).data.data.meta.total;
            return tot;
        }
        var promises: Promise<string>[] = [];
        for (const key in tokenList) {
            promises.push(getList(tokenList[key]));
        }
        var rt = await Promise.all(promises);
        for (const idx in rt) {
            res = {
                ...res,
                [Object.keys(tokenList)[idx]]: rt[idx]
            }
        }
        session.sendCard([
            {
                "type": "card",
                "theme": "secondary",
                "size": "lg",
                "modules": [
                    {
                        "type": "section",
                        "text": {
                            "type": "paragraph",
                            "cols": 2,
                            "fields": [
                                {
                                    "type": "kmarkdown",
                                    "content": `**Name**\n${Object.keys(res).join('\n')}`
                                },
                                {
                                    "type": "kmarkdown",
                                    "content": `**Server Count**\n${Object.values(res).join('\n')}`
                                }
                            ]
                        }
                    }
                ]
            }
        ]);
    };
}

export const list = new List();


