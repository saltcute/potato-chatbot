import { Card, MenuCommand } from 'kbotify';

class EchoMenu extends MenuCommand {
    code = 'help';
    trigger = 'help';

    intro = '帮助';
    menu = new Card().addText('一些卡片里需要展示的东西').toString();
    useCardMenu = true; // 使用卡片菜单
}

export const echoMenu = new EchoMenu(echoKmd);
