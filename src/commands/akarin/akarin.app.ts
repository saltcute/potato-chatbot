import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const videos = [
    "https://img.kookapp.cn/attachments/2022-07/01/62bef564583ba.mp4",
    "https://img.kookapp.cn/attachments/2022-07/01/62bef566405d4.mp4",
    "https://img.kookapp.cn/attachments/2022-07/01/62bef56d82f8d.mp4",
    "https://img.kookapp.cn/attachments/2022-07/01/62bef56fc514a.mp4",
    "https://img.kookapp.cn/attachments/2022-07/01/62bef571928c5.mp4",
    "https://img.kookapp.cn/attachments/2022-07/01/62bef5731c6b9.mp4",
    "https://img.kookapp.cn/attachments/2022-07/01/62bef5761256c.mp4",
    "https://img.kookapp.cn/attachments/2022-07/01/62bef577a1ca1.mp4",
    "https://img.kookapp.cn/attachments/2022-07/01/62bef578a4bae.mp4",
    "https://img.kookapp.cn/attachments/2022-07/01/62bef57c353a9.mp4",
    "https://img.kookapp.cn/attachments/2022-07/01/62bef57d7957b.mp4"
]

class Akarin extends AppCommand {
    code = 'akarin'; // 只是用作标记
    trigger = 'akarin'; // 用于触发的文字
    intro = '＼ｱｯｶﾘ～ﾝ／';
    func: AppFunc<BaseSession> = async (session) => {
        const index = getRandomInt(videos.length);
        return session.sendCard(new Card({
            "type": "card",
            "theme": "secondary",
            "size": "lg",
            "modules": [
                {
                    "type": "video",
                    "title": `Akarin~ ${index}`,
                    "src": videos[index]
                }
            ]
        }).toString());
    };
}

export const akarin = new Akarin();


