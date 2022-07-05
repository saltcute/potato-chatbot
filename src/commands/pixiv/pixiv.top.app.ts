import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';
const najax = require('najax');
const FormData = require('form-data');
const got = require('got');
const axios = require('axios');
const sharp = require('sharp');
import * as linkmap from './linkmap'

class Top extends AppCommand {
    code = 'top'; // 只是用作标记
    trigger = 'top'; // 用于触发的文字
    intro = 'Top illustrations';
    func: AppFunc<BaseSession> = async (session) => {
        async function sendCard(res: any) {
            const data = JSON.parse(res);
            var link: string[] = [];
            async function uploadImage() {
                for (let key = 0; key < 9; key++) {
                    if (key >= 9) break;
                    const val = data[key];
                    if (val.x_restrict !== 0) {
                        link.push("https://img.kaiheila.cn/assets/2022-07/vlOSxPNReJ0dw0dw.jpg");
                        continue;
                    }
                    if (linkmap.isInDatabase(val.id)) {
                        link.push(linkmap.getLink(val.id));
                        continue;
                    } else {
                        session.send(`正在转存 ${val.id}_p0.jpg，可能需要较长时间……(${key + 1}/9)`)
                    }

                    const master1200 = `https://pixiv.re/${val.id}${val.page_count > 1 ? "-1" : ""}.jpg`;
                    console.log(`Resaving... ${master1200}`);
                    // return;
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
                        link.push(res.data.data.url);
                        linkmap.addLink(val.id, res.data.data.url);
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
                        "type": "image-group",
                        "elements": [
                            {
                                "type": "image",
                                "src": link[0]
                            },
                            {
                                "type": "image",
                                "src": link[1]
                            },
                            {
                                "type": "image",
                                "src": link[2]
                            },
                            {
                                "type": "image",
                                "src": link[3]
                            },
                            {
                                "type": "image",
                                "src": link[4]
                            },
                            {
                                "type": "image",
                                "src": link[5]
                            },
                            {
                                "type": "image",
                                "src": link[6]
                            },
                            {
                                "type": "image",
                                "src": link[7]
                            },
                            {
                                "type": "image",
                                "src": link[8]
                            }
                        ]
                    }
                ]
            }))
        }
        if (session.args.length === 0) {
            najax({
                url: `http://pixiv.lolicon.ac.cn/ranklist`,
                type: "GET",
                success: (res: any) => {
                    sendCard(res);
                },
                error: (e: any) => {
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
                }
            });
        } else {
            najax({
                url: `http://pixiv.lolicon.ac.cn/topInTag`,
                type: "GET",
                data: {
                    keyword: session.args[0]
                },
                success: (res: any) => {
                    sendCard(res);
                },
                error: (e: any) => {
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
                }
            });
        }
    };
}

export const top = new Top();


