Meteor.methods({
  markRead(threadId) {
    check(threadId, String);
    ThreadUsers.update({threadId, userType: 'Users', userId: this.userId}, {$set: {read: true}});
  },
  sendMessage(threadId, content, internal=false) {
    check(threadId, String);
    check(content, String);

    let userId = this.userId;
    let user = Meteor.users.findOne(userId);
    let thread = Threads.findOne(threadId);
    let threadUser = ThreadUsers.findOne({threadId, userId, userType: 'Users'});

    if (thread && thread.scope != 'private' || threadUser) {
      return Threads.addMessage(thread, user, {
        content,
        internal
      });
    }
  },
  sendEmail(emails, subject, content) {
    check(emails, String);
    check(subject, String);
    check(content, String);

    let userId = this.userId;
    let user = Meteor.users.findOne(userId);
    let contacts = Contacts.parse(emails);
    if (!_.isEmpty(contacts)) {
      let threadId = Threads.create(user, 'Email', subject);
      let thread = Threads.findOne(threadId);

      Threads.ensureMember(thread, user);
      contacts.forEach(c => Threads.ensureMember(thread, c));
      return Threads.addMessage(thread, user, {
        content
      });
    }
  },
  queryContacts(keyword) {
    check(keyword, String);

    let search = {$or: [
      {"profile.name": {$regex: keyword, $options: 'i'}},
      {email: {$regex: keyword, $options: 'i'}}
    ]};
    let contacts = Contacts.find(search, {limit: 5}).map(c => [{name: c.name(), email: c.email}]);
    let users = Users.find(search, {limit: 5}).map(c => [{name: c.name(), email: c.email()}]);
    return _.union(users, contacts);
  },
  queryContactsForThread(keyword, params) {
    check(keyword, String);
    check(params, Object);

    let threadId = params.id;
    let userIds = ThreadUsers.find({threadId, userType: 'Users'}).map(tu => tu.userId);
    let contactIds = ThreadUsers.find({threadId, userType: 'Contacts'}).map(tu => tu.userId);

    let search = {$or: [
      {"profile.name": {$regex: keyword, $options: 'i'}},
      {email: {$regex: keyword, $options: 'i'}}
    ]};
    let contacts = Contacts.find(_.extend(search, {_id: {$nin: contactIds}}), {limit: 5}).map(c => [{name: c.name(), email: c.email}]);
    let users = Users.find(_.extend(search, {_id: {$nin: userIds}}), {limit: 5}).map(c => [{name: c.name(), email: c.email()}]);
    return _.union(users, contacts);
  },
  addThreadMembers(threadId, emails) {
    check(threadId, String);
    check(emails, String);

    let thread = Threads.findOne(threadId);
    let members = Contacts.parse(emails);
    members.forEach(c => Threads.ensureMember(thread, c));
    return members.length;
  },
  removeThreadMember(threadId, userType, userId) {
    check(threadId, String);
    check(userType, String);
    check(userId, String);

    ThreadUsers.remove({threadId, userType, userId});
  }
});