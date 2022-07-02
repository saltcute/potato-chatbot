import { akarin } from 'commands/singleCommand/akarin.app';
import { bot } from 'init/client';
import { helpMenu } from './commands/singleCommand/help.menu';
import { hitokoto } from 'commands/singleCommand/hitokoto.app';
import { v } from './commands/v/v.app';

bot.messageSource.on('message', (e) => {
    bot.logger.debug(`received:`, e);
    // 如果想要在console里查看收到信息也可以用
    // console.log(e);
});

bot.addCommands(helpMenu);
bot.addCommands(hitokoto);
bot.addCommands(akarin);
bot.addCommands(v);

bot.connect();

bot.logger.debug('system init success');
