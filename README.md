# potato-chatbot

Based on [kbotify](https://github.com/fi6/kBotify)

## TODO

- `.pixiv`
    - [ ] Ability to change illustration ranklist time period
    - [x] Refresh linkmap of a certain illustration
    - [x] (sort of) Maybe a better way of censoring NSFW
        - NSFW illustrations will be attempted to add gaussian blur for up to 35px before falling back to Akarin
- `.v`
    - [ ] Maybe a better way of getting quotes
- `.music`
    - [ ] Implement basic function
- `.vtuber`
    - [ ] Implement basic function

---

## Avaliable commands

- `.help`
- `.v`
- **`.pixiv`**
- `.akarin`
- `.hitokoto`

### `.help`

Get the list of commands.

```
指令列表
---
.help
.v
.pixiv
.akarin
.hitokoto
```

```
Command List
---
.help
.v
.pixiv
.akarin
.hitokoto
```

### `.v`

Get a random quote in local file `./commands/v/quotes.json`.

### `.pixiv`

Serval ultilities about pixiv.

```
Pixiv 命令
---
.pixiv top [标签]? 获取本周 [标签] 标签的人气前九的图片，若 [标签] 缺省则为全站排名。
.pixiv illust [插画 ID] 获取 Pixiv 上对应 ID 的插画。
.pixiv author [用户 ID] 获取用户的最新九张插画。
.pixiv detail [插画 ID] 获取对应 ID 插画的详细信息（作品名、作者、标签……）。
.pixiv refresh [插画 ID] 刷新对应 ID 插画的缓存。（当图片显示不正常时，可以在几分钟后运行此命令）
```


```
Pixiv Commands
---
.pixiv top [tag]? Get the top 9 most popular illustrations with [tag] tag submitted this week. If [tag] is not provided, get the top 9 most popluar illustrations in every illustrations submitted this week.
.pixiv illust [Illustration ID] Get the illustration of the given illustration ID.
.pixiv author [User ID] Get the top 9 newest illustrations from the given user.
.pixiv detail [Illustration ID] Get the detail of the illustration of the given ID (name, author, tags, etc.).
.pixiv refresh [Illusration ID] Refresh cache for the illustration of the given ID. (Run this serval minutes later if some image does not display correctly)
```

Every illustration needs to be uploaded to KOOK's server before sending. R-18 and R-18G (based on Pixiv) illustration (if any) will not be upload and will be replaced with the picture below.

In regard of server bandwidth and load time, original image will be resize to 512px in width before uploading.

Some illustrations may be censored by KOOK after uploading to their servers. The bot will first try to apply gaussian plur to those image for up to 35px. If those image are still censored, they will be replaced by the same picture as well.

![akarin~](https://img.kaiheila.cn/assets/2022-07/vlOSxPNReJ0dw0dw.jpg)

Although KOOK seems to have their way of preventing massive reupload, after uploading, a map of pixiv illustration ID to its corresponding file link on KOOK's server will be added to a local file `./commands/pixiv/common/linkmap/map.json`. This can save server bandwidth and improve load time.

### `.akarin`

~~ｱｯｶﾘ～ﾝ~~

Get a random video from the 11 title calls of Yuru Yuri Season 1.

### `.hitokoto`

Get a random quote from `hitokoto.cn`