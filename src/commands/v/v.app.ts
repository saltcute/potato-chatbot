import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';

class V extends AppCommand {
    code = 'v'; // 只是用作标记
    trigger = 'v'; // 用于触发的文字
    intro = 'v';
    func: AppFunc<BaseSession> = async (session) => {
        return session.quote("关注[小希小桃Channel](https://space.bilibili.com/5563350)喵，关注[小希小桃Channel](https://space.bilibili.com/5563350)谢谢喵。");
    };
}

export const v = new V();
