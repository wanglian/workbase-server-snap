import '../live-chat';

// TODO protect live.chat
const createLiveChat = () => {
  let email = `live.chat@${Instance.domain()}`;
  let channel = Accounts.findUserByEmail(email);
  return channel && channel._id || Accounts.createUser({
    email,
    profile: {
      type: 'Channels',
      name: 'Live Chat',
      livechat: true
    }
  });
};

Meteor.startup(function() {
  Threads.findOne({category: 'AdminLiveChat'}) || Threads.create(null, 'AdminLiveChat', 'Live Chat Management', 'admin');
});

Accounts.onLogin(function(attempt) {
  // admin
  let admin = Instance.admin();
  if (admin._id === attempt.user._id) {
    let thread = Threads.findOne({category: 'AdminLiveChat'});
    let channelId = createLiveChat();
    Threads.ensureMember(thread, admin, {channelId});
  }
});

// - channel
// - contact
// - email Email联系人的原始邮箱信息
const startLiveChat = (channel, contact, email) => {
  let tu = ThreadUsers.findOne({userType: 'Contacts', userId: contact._id, "params.chat": channel._id});

  let threadId = tu && tu.threadId;
  if (!threadId) {
    threadId = Threads.create(contact, 'LiveChat', 'Live Chat', 'protected');
  }

  let thread = Threads.findOne(threadId);
  Threads.ensureMember(thread, contact, {chat: channel._id, email});
  Threads.ensureMember(thread, channel, {chat: contact._id, email});

  return thread;
};

Meteor.methods({
  sendLiveChatMessage(email, name, content) {
    check(email, String);
    check(name, Match.Maybe(String));
    check(content, String);

    let address = `${name} <${email}>`;
    let contact = Contacts.parseOne(address);
    let channel = Channels.findOne({"profile.type": 'Channels', "profile.livechat": true});
    if (channel) {
      let thread = startLiveChat(channel, contact, address);
      return Threads.addMessage(thread, contact, {
        content,
        email: {from: address} // 保存联系人原始信息
      });
    }
  }
});