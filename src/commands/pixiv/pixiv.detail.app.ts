import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';
const najax = require('najax');
const FormData = require('form-data');
const got = require('got');
const axios = require('axios');
const sharp = require('sharp');
import * as linkmap from './linkmap'

class Detail extends AppCommand {
    code = 'detail'; // 只是用作标记
    trigger = 'detail'; // 用于触发的文字
    intro = 'Detail';
    func: AppFunc<BaseSession> = async (session) => {
        async function sendCard(res: any) {
            const data = JSON.parse(res);
            var link = "";
            async function uploadImage() {
                const val = data;
                if (val.x_restrict !== 0) {
                    link = "https://img.kaiheila.cn/assets/2022-07/vlOSxPNReJ0dw0dw.jpg";
                }
                if (linkmap.isInDatabase(val.id)) {
                    link = linkmap.getLink(val.id);
                } else {
                    session.send(`正在转存 ${val.id}_p0.jpg，可能需要较长时间……`)
                }

                const master1200 = `https://pixiv.re/${val.id}${val.page_count > 1 ? "-1" : ""}.jpg`;
                console.log(`Resaving... ${master1200}`);
                var bodyFormData = new FormData();
                const resizer = sharp().resize(512).jpeg();
                const stream = got.stream(master1200).pipe(resizer)
                // const write = fs.createWriteStream("22.jpg");
                // stream.pipe(write);
                bodyFormData.append('file', stream, "1.jpg");
                await axios({
                    method: "post",
                    url: "https://www.kookapp.cn/api/v3/asset/create",
                    data: bodyFormData,
                    headers: {
                        'Authorization': "Bot 1/MTE0NjU=/TZAEeqkcuTV1grq5trNxJw==",
                        ...bodyFormData.getHeaders()
                    }
                }).then((res: any) => {
                    link = res.data.data.url;
                    linkmap.addLink(val.id, res.data.data.url)
                }).catch((e: any) => {
                    if (e) {
                        console.log(e);
                        session.sendCard(new Card({
                            "type": "card",
                            "theme": "secondary",
                            "size": "lg",
                            "modules": [
                                {
                                    "type": "section",
                                    "text": {
                                        "type": "kmarkdown",
                                        "content": "**内部错误 | Internal Error**"
                                    }
                                },
                                {
                                    "type": "divider"
                                },
                                {
                                    "type": "context",
                                    "elements": [
                                        {
                                            "type": "plain-text",
                                            "content": "错误信息（开发者）"
                                        }
                                    ]
                                },
                                {
                                    "type": "section",
                                    "text": {
                                        "type": "kmarkdown",
                                        "content": `\`\`\`\n${e}\n\`\`\``
                                    }
                                }
                            ]
                        }))
                    }
                });
            }
            await uploadImage();
            linkmap.saveLink();
            console.log(link);
            session.sendCard(new Card({
                "type": "card",
                "theme": "secondary",
                "size": "lg",
                "modules": [
                    {
                        "type": "section",
                        "text": {
                            "type": "kmarkdown",
                            "content": `**${data.title}**`
                        }
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "kmarkdown",
                                "content": `**[${data.user.name}](https://www.pixiv.net/users/${data.user.uid})**(${data.user.uid}) | [pid ${data.id}](https://pixiv.re/${data.id}${data.page_count > 1 ? "-1" : ""}.jpg)`
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
                        "type": "context",
                        "elements": [
                            {
                                "type": "plain-text",
                                "content": `${((): string => {
                                    var str = ""
                                    for (const val of data.tags) {
                                        str += `#${val.name}  `
                                    }
                                    return str;
                                })()}`
                            }
                        ]
                    }
                ]
            }));
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
                error: (res: any) => {
                    session.sendCard(new Card({
                        "type": "card",
                        "theme": "secondary",
                        "size": "lg",
                        "modules": [
                            {
                                "type": "section",
                                "text": {
                                    "type": "kmarkdown",
                                    "content": "**内部错误 | Internal Error**"
                                }
                            },
                            {
                                "type": "divider"
                            },
                            {
                                "type": "context",
                                "elements": [
                                    {
                                        "type": "plain-text",
                                        "content": "错误信息（开发者）"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "text": {
                                    "type": "kmarkdown",
                                    "content": `\`\`\`${res}\`\`\``
                                }
                            }
                        ]
                    }))
                }
            });
        }
    };
}

export const detail = new Detail();


