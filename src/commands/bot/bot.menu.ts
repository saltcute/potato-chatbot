import { Card, MenuCommand } from 'kbotify';
import { list } from './bot.list.app';

class BotMenu extends MenuCommand {
    code = 'bot';
    trigger = 'bot';

    intro = 'bot';
    menu = new Card({
        "type": "card",
        "theme": "secondary",
        "size": "lg",
        "modules": [
            {
                "type": "header",
                "text": {
                    "type": "plain-text",
                    "content": "Command list"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "`.bot list`"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "`.bot detail [bot]`"
                }
            }
        ]
    }).toString();
    useCardMenu = true; // 使用卡片菜单
}

export const botMenu = new BotMenu(list);
