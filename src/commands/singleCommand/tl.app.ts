import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';
import axios from 'axios';
import crypto from 'crypto';
class Translate extends AppCommand {
    code = 'translate'; // 只是用作标记
    trigger = 'translate'; // 用于触发的文字
    intro = 'Translate';
    func: AppFunc<BaseSession> = async (session) => {
        function truncate(q: string) {
            var len = q.length;
            if (len <= 20) return q;
            return q.substring(0, 10) + len + q.substring(len - 10, len);
        }
        var string = session.args.join(" ");
        var uuid = crypto.randomUUID();
        var time = Math.round(Date.now() / 1000);
        var input = truncate(string);
        console.log(input);
        // console.log(string);
        // return;
        axios({
            method: "GET",
            url: "https://openapi.youdao.com/api",
            params: {
                q: input,
                from: "zh-CHS",
                to: "en",
                appKey: "769f3a2132f28c90",
                salt: uuid,
                curtime: time,
                signType: "v3",
                sign: crypto.createHash('sha256').update("769f3a2132f28c90" + input + uuid + time + "2DHfaZtktALmXKNd3id20XNeUkO7uKlB").digest('hex')
            }
        }).then((res) => {
            console.log(res.data.translation[0]);
            session.reply(res.data.translation[0]);
        }).catch((e) => { console.log(e) });
    }
}

export const translate = new Translate();


