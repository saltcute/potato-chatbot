import { Card, MenuCommand } from 'kbotify';

class HelpMenu extends MenuCommand {
    code = 'help';
    trigger = 'help';

    intro = '帮助';
    menu = new Card({
        "type": "card",
        "theme": "secondary",
        "size": "lg",
        "modules": [
            {
                "type": "header",
                "text": {
                    "type": "plain-text",
                    "content": "指令列表"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "`.help`"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "`.v`"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "`.pixiv`"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "`.akarin`"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "`.hitokoto`"
                }
            }
        ]
    }).toString();
    useCardMenu = true; // 使用卡片菜单
}

export const helpMenu = new HelpMenu();
