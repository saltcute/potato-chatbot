import { akarin } from 'commands/akarin/akarin.app';
import { bot } from 'init/client';
import { helpMenu } from './commands/help/help.menu';
import { v } from './commands/v/v.app';

bot.messageSource.on('message', (e) => {
    bot.logger.debug(`received:`, e);
    // 如果想要在console里查看收到信息也可以用
    // console.log(e);
});

bot.addCommands(akarin);
bot.addCommands(helpMenu);
bot.addCommands(v);

bot.connect();

bot.logger.debug('system init success');
