import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';

class Top extends AppCommand {
    code = 'top'; // 只是用作标记
    trigger = 'top'; // 用于触发的文字
    intro = 'Top illustrations';
    func: AppFunc<BaseSession> = async (session) => {
        return session.quote("");
    };
}

export const top = new Top();


