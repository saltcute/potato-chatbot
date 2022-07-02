import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';
const najax = require('najax');

class Hitokoto extends AppCommand {
    code = 'hitokoto'; // 只是用作标记
    trigger = 'hitokoto'; // 用于触发的文字
    intro = '一言';
    func: AppFunc<BaseSession> = async (session) => {
        najax({
            url: "https://v1.hitokoto.cn",
            type: "GET",
            success: (res: string) => {
                const data = JSON.parse(res);
                return session.sendCard(new Card({
                    "type": "card",
                    "theme": "secondary",
                    "size": "lg",
                    "modules": [
                        {
                            "type": "section",
                            "text": {
                                "type": "kmarkdown",
                                "content": data.hitokoto
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "kmarkdown",
                                "content": `——${data.from_who == "null" ? "" : `*${data.from_who}*`} 「${data.from}」`
                            }
                        }
                    ]
                }).toString());
            }
        })
    }
}

export const hitokoto = new Hitokoto();


