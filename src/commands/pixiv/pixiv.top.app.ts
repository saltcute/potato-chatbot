import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';

class Top extends AppCommand {
    code = 'top'; // 只是用作标记
    trigger = 'top'; // 用于触发的文字
    intro = 'Top illustrations';
    func: AppFunc<BaseSession> = async (session) => {
        return session.quote("我半年前本来打算实现一个功能我以为我做完了结果今天才发现我还没做你妈的");
    };
}

export const top = new Top();


