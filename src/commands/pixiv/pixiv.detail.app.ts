import { Card, AppCommand, AppFunc, BaseSession, CardObject } from 'kbotify';
const najax = require('najax');
const FormData = require('form-data');
const got = require('got');
const axios = require('axios');
const sharp = require('sharp');
import * as linkmap from './common/linkmap'
import * as pixiv from './common'
import auth from '../../configs/auth';

class Detail extends AppCommand {
    code = 'detail'; // 只是用作标记
    trigger = 'detail'; // 用于触发的文字
    intro = 'Detail';
    func: AppFunc<BaseSession> = async (session) => {
        var loadingBarMessageID: string = "null";
        async function sendCard(res: any) {
            const data = JSON.parse(res);
            var link = "";
            async function uploadImage() {
                const val = data;
                if (val.x_restrict !== 0) {
                    link = "https://img.kaiheila.cn/assets/2022-07/vlOSxPNReJ0dw0dw.jpg";
                    return;
                }
                if (pixiv.linkmap.isInDatabase(val.id)) {
                    link = pixiv.linkmap.getLink(val.id);
                    return;
                } else {
                    await session.sendCard([
                        {
                            "type": "card",
                            "theme": "warning",
                            "size": "lg",
                            "modules": [
                                {
                                    "type": "section",
                                    "text": {
                                        "type": "kmarkdown",
                                        "content": `正在转存 ${val.id}_p0.jpg，可能需要较长时间:hourglass_flowing_sand:……`
                                    }
                                }
                            ]
                        }
                    ]).then((data) => {
                        if (data.msgSent?.msgId !== undefined) {
                            loadingBarMessageID = data.msgSent.msgId;
                        }
                    });
                }

                const master1200 = val.image_urls.large.replace("i.pximg.net", "i.pixiv.re");
                console.log(`[${new Date().toLocaleTimeString()}] Resaving... ${master1200}`);
                var bodyFormData = new FormData();
                const resizer = sharp().resize(512).jpeg();
                const stream = got.stream(master1200).pipe(resizer); // resize
                // const stream = got.stream(master1200); // no resize
                bodyFormData.append('file', stream, "1.jpg");
                var rtLink = "";
                await axios({
                    method: "post",
                    url: "https://www.kookapp.cn/api/v3/asset/create",
                    data: bodyFormData,
                    headers: {
                        'Authorization': `Bot ${auth.khltoken}`,
                        ...bodyFormData.getHeaders()
                    }
                }).then((res: any) => {
                    rtLink = res.data.data.url
                }).catch((e: any) => {
                    if (e) {
                        session.sendCard(pixiv.cards.error(e));
                    }
                });
                await axios({
                    url: rtLink,
                    type: "GET"
                }).catch(() => {
                    rtLink = "https://img.kaiheila.cn/assets/2022-07/vlOSxPNReJ0dw0dw.jpg";
                });
                link = rtLink;
                pixiv.linkmap.addLink(val.id, rtLink);
            }
            await uploadImage();
            pixiv.linkmap.saveLink();
            await axios({
                url: link,
                type: "GET"
            }).catch(() => {
                link = "https://img.kaiheila.cn/assets/2022-07/vlOSxPNReJ0dw0dw.jpg";
            });
            const card = [new Card({
                "type": "card",
                "theme": "info",
                "size": "lg",
                "modules": [
                    {
                        "type": "section",
                        "text": {
                            "type": "kmarkdown",
                            "content": `**${(() => {
                                if (data.x_restrict == 0) {
                                    return data.title;
                                } else {
                                    return `不可以涩涩`
                                }
                            })()}**`
                        }
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "kmarkdown",
                                "content": `**[${data.user.name}](https://www.pixiv.net/users/${data.user.uid})**(${data.user.uid}) | [pid ${data.id}](https://www.pixiv.net/artworks/${data.id})`
                            }
                        ]
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "container",
                        "elements": [
                            {
                                "type": "image",
                                "src": link
                            }
                        ]
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "plain-text",
                                "content": `${((): string => {
                                    if (data.x_restrict == 0) {
                                        var str = ""
                                        for (const val of data.tags) {
                                            str += `#${val.name}  `
                                        }
                                        return str;
                                    } else {
                                        return "#不可以涩涩";
                                    }
                                })()}`
                            }
                        ]
                    }
                ]
            })]
            if (loadingBarMessageID == "null") {
                session.sendCard(card)
            } else {
                session.updateMessage(loadingBarMessageID, card);
            }
        }
        if (session.args.length === 0) {
            return session.reply("`.pixiv detail [插画 ID]` 获取对应 ID 插画的详细信息（作品名、作者、简介……）")
        } else {
            najax({
                url: `http://pixiv.lolicon.ac.cn/illustrationDetail`,
                type: "GET",
                data: {
                    keyword: session.args[0]
                },
                success: (res: any) => {
                    sendCard(res);
                },
                error: (e: any) => {
                    session.sendCard(pixiv.cards.error(e));
                }
            });
        }
    };
}

export const detail = new Detail();


