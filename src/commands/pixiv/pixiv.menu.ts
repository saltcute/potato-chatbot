import auth from 'configs/auth';
import { Card, MenuCommand } from 'kbotify';
import { author } from './pixiv.author.app';
import { detail } from './pixiv.detail.app';
import { illust } from './pixiv.illust.app';
import { top } from './pixiv.top.app';

class PixivMenu extends MenuCommand {
    code = 'pixiv';
    trigger = 'pixiv';

    intro = 'Pixiv';
    menu = new Card({
        "type": "card",
        "theme": "secondary",
        "size": "lg",
        "modules": [
            {
                "type": "header",
                "text": {
                    "type": "plain-text",
                    "content": "Pixiv 命令"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "`.pixiv top [tag]?` 返回当天 [tag] 标签的人气前九的图片，若 [tag] 缺省则为全站排名 (Unimplemented)"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "`.pixiv illust [illustration ID]` 获取 Pixiv 上对应 ID 的插画 (Unimplemented)"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": `.pixiv author ["id"/"name"] [user ID/username] 获取用户的最新九张插画 (Unimplemented)`
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "`.pixiv detail [illustration ID]` 获取对应 ID 插画的详细信息（作品名、作者、简介……） (Unimplemented).20"
                }
            }
        ]
    }).toString();
    useCardMenu = true; // 使用卡片菜单
}

export const pixivMenu = new PixivMenu(top, illust, detail, author);
