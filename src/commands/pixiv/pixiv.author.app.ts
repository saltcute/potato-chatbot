import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';
const najax = require('najax');
const FormData = require('form-data');
const got = require('got');
const axios = require('axios');
const sharp = require('sharp');
import * as linkmap from './linkmap'

class Author extends AppCommand {
    code = 'author'; // 只是用作标记
    trigger = 'author'; // 用于触发的文字
    intro = 'Author';
    func: AppFunc<BaseSession> = async (session) => {
        var loadingBarMessageID: string = "null";
        async function sendCard(res: any) {
            const data = JSON.parse(res);
            var link: string[] = [];
            async function uploadImage() {
                for (let key = 0; key < 9; key++) {
                    if (key >= 9) break;
                    // console.log(data);
                    const val = data[key];
                    // console.log(val);
                    if (val.x_restrict !== 0) {
                        link.push("https://img.kaiheila.cn/assets/2022-07/vlOSxPNReJ0dw0dw.jpg");
                        continue;
                    }
                    if (linkmap.isInDatabase(val.id)) {
                        link.push(linkmap.getLink(val.id));
                        continue;
                    } else {
                        if (loadingBarMessageID !== "null") {
                            await session.updateMessage(loadingBarMessageID, [
                                {
                                    "type": "card",
                                    "theme": "warning",
                                    "size": "lg",
                                    "modules": [
                                        {
                                            "type": "section",
                                            "text": {
                                                "type": "kmarkdown",
                                                "content": `正在转存 ${val.id}_p0.jpg，可能需要较长时间……(${key + 1}/9) ${key % 2 == 1 ? ":hourglass_flowing_sand:" : ":hourglass:"}……`
                                            }
                                        }
                                    ]
                                }
                            ])
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
                                                "content": `正在转存 ${val.id}_p0.jpg，可能需要较长时间……(${key + 1}/9) :hourglass:……`
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
                    }
                    const master1200 = val.image_urls.large.replace("i.pximg.net", "i.pixiv.re");
                    console.log(`[${new Date().toLocaleTimeString()}] Resaving... ${master1200}`);
                    // return;
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
                            'Authorization': "Bot 1/MTE0NjU=/TZAEeqkcuTV1grq5trNxJw==",
                            ...bodyFormData.getHeaders()
                        }
                    }).then((res: any) => {
                        rtLink = res.data.data.url
                    }).catch((e: any) => {
                        if (e) {
                            console.log(e);
                            session.sendCard(new Card({
                                "type": "card",
                                "theme": "danger",
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
                    await axios({
                        url: rtLink,
                        type: "GET"
                    }).catch(() => {
                        rtLink = "https://img.kaiheila.cn/assets/2022-07/vlOSxPNReJ0dw0dw.jpg";
                    });
                    link.push(rtLink);
                    linkmap.addLink(val.id, rtLink);
                }
            }
            await uploadImage();
            linkmap.saveLink();
            for (let key = 0; key < 9; key++) {
                await axios({
                    url: link[key],
                    type: "GET"
                }).catch(() => {
                    link[key] = "https://img.kaiheila.cn/assets/2022-07/vlOSxPNReJ0dw0dw.jpg";
                });
            }
            if (loadingBarMessageID == "null") {
                session.sendCard([{
                    "type": "card",
                    "theme": "secondary",
                    "size": "lg",
                    "modules": [
                        {
                            "type": "section",
                            "text": {
                                "type": "kmarkdown",
                                "content": `**${data[0].user.name}** | uid [${data[0].user.uid}](https://www.pixiv.net/users/${data[0].user.uid})`
                            }
                        },
                        {
                            "type": "divider"
                        },
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
                }])
            } else {
                session.updateMessage(loadingBarMessageID, [{
                    "type": "card",
                    "theme": "secondary",
                    "size": "lg",
                    "modules": [
                        {
                            "type": "section",
                            "text": {
                                "type": "kmarkdown",
                                "content": `**${data[0].user.name}** | uid [${data[0].user.uid}](https://www.pixiv.net/users/${data[0].user.uid})`
                            }
                        },
                        {
                            "type": "divider"
                        },
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
                }]);
            }
        }
        if (session.args.length === 0) {
            return session.reply(`.pixiv author [用户 ID] 获取用户的最新九张插画`)
        } else {
            najax({
                url: `http://pixiv.lolicon.ac.cn/creatorIllustrations`,
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
                            "theme": "danger",
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

export const author = new Author();


