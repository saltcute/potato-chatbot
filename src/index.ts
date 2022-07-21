import axios from 'axios';
import auth from 'configs/auth';
import { bot } from 'init/client';
import { v } from 'commands/v/v.app';
import { akarin } from 'commands/singleCommand/akarin.app';
import { helpMenu } from 'commands/singleCommand/help.menu';
import { hitokoto } from 'commands/singleCommand/hitokoto.app';
import { botMenu } from 'commands/bot/bot.menu';

bot.messageSource.on('message', (e) => {
    bot.logger.debug(`received:`, e);
    // 如果想要在console里查看收到信息也可以用
    // console.log(e);
});

bot.addCommands(v);
bot.addCommands(akarin);
bot.addCommands(helpMenu);
bot.addCommands(hitokoto);
bot.addCommands(botMenu);

bot.connect();

bot.logger.debug('system init success');