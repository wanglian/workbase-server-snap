# 开发进展

## 12-16

- 内部消息标识：只在有外部联系人的情况下显示
- 图片上传显示spinner
- 使用fancybox查看图片

## 12-15

- 时区方案：Server系统时区设置为企业总部所在，程序不用处理时区问题。限制是报表只能以Server时区统计
- fix chart: 设置y轴精度，不要出现小数点
- 发送图片：可预览，增加image消息类型，image消息类型展现，image消息以内嵌图片发邮件
- 异步发送邮件 Promise
- 写邮件完成后，重定向到邮件话题

## 12-14

- 解析邮件区分格式html/text：有bodyHtml为html，否则从bodyPlain取为text
- 用iframe显示html内容
- html内的链接在新窗口打开：target=_blank
- 进入话题页面或切换话题，默认焦点放在回复框，并且可以按ctrl+enter发送。（考虑到移动设备上的体验，消息发送后，或进入/切换话题，均不focus到回复框）
- 样式改进：列表选中border加深，光标在消息上时消息头部显示背景色及底边框；消息折叠情况下的优化处理
- Modal设置为静态模式，点击不会关闭
- 消息统计：日统计，分时统计

## 12-13

- fix动态布局：之前是整个页面重新渲染。
- fix布局相关页面：话题列表/用户列表/频道
- 话题列表分页
- 频道话题列表分页
- 消息分页
- fix草稿：保存不必判断是否为空，否则不能删除草稿
- 发送邮件带上h:In-Reply-To 为上一条消息的emailId
- fix解析邮件聚合：In-Reply-To + References
- fix接收邮件内容限制：设置为50M

## 12-12

- 话题管理者：话题创建者（外部联系人发起的邮件，外部联系人为创建者），或第一个内部用户
- 话题成员不能删除：创建者（或原始发起人）
- 浏览器TAB标题显示未读数
- LOGO设计 https://www.logaster.com
- fix read：发邮件时本人直接标记已读
- fix ipad浏览器布局显示问题：多加了clearfix

## 12-11

- 话题成员角色：创建者
- 添加/删除话题成员
- 只有Email类型的话题可能 添加/删除成员。Chat类型不可。
- 部署到EC2：t2.medium (mongo + app)
- 使用配置文件：company/domain/mailgun key
- 首次使用系统，设置管理员帐号：name/email/password
- 更新欢迎信：中文
- 纯文本邮件解析：之前加上<pre></pre>，导致显示在代码框里。去掉。
- 增强Thread类型扩展：title加上参数detail，Chat有这个需求：列表里显示用户姓名，消息界面显示“与xx的会话”
- 申请ssl证书 weaworking.com：在腾讯云免费申请。
- 配置ssl
- Base -> WorkBase
- 使用W形状logo
- 删除话题成员确认

## 12-10

- 发邮件表单：收件人自动提示
- 国际化处理 i18next
- channel未读：收到外部消息标记为未读
- channel已读：回复外部标记为已读
- channel未读数显示
- fix route：router plugin使用不对（弃用）
- fix draft：两种情况保存：退出话题页面，切换话题。切换时先保存再加载。
- 消息功能：复制消息
- 异步解析邮件 Promise
- 邮件解析异常处理：收件人不存在，捕获异常返回成功给mailgun

## 12-09

- setup页面
- 重构welcome邮件
- profile页面，功能未做

## 12-08

- 改进标记已读：进入话题延时两秒，停留在话题页面有新消息时需滚动页面
- fix chat：开启聊天时检查自己的ThreadUser，发消息时检查对方的ThreadUser
- 添加/删除channel members

## 12-07

- 内部通信录
- 私聊 Chat
- Thread类型扩展方案：ThreadUsers.params保存扩展字段，client端带到Threads.params。
- 布局扩展方案：增加menu
- 添加/修改用户
- 添加/修改Channel
- 管理菜单：创建channel/用户
- 设置管理员角色，可见管理菜单

## 12-06

- channel - 创建 User profile.channel=true
- channel - 建立关系 ChannelUser
- channel - 入口 sidebar
- channel - 发布 threads
- 内部消息：不对外部联系人发邮件
- Threads 增加字段 scope: private/protected/public
- Threads 增加字段 userType/userId，提供一种扩展可能，可根据userType设置scope
- sidebar 菜单active状态
- 重构动态布局

## 12-05

- landing page
- 回复
- 标记已读
- spinner / status(server连接状态)
- 草稿：因为动态布局的切换导致页面重新render，所以消息框内容会消失，因此使用草稿来解决这个问题。按话题保存在浏览器端。
- 按shift点消息区，折叠/展开所有消息
- 动态布局的响应应返回按钮
- 发邮件基本功能

## 12-04

- 解析邮件：多个to，cc
- 改进三栏布局模板
- Accordion效果

## 12-03

- 实现内容区三栏动态自适应布局
- 实现话题列表（一栏）
- 实现话题展现（二栏）
- 实现回复邮件Method：sendMessage(threadId, content)
- 实现接收解析邮件（一对一），回复邮件聚合
- 实现消息折叠开关：shift+click全部折叠