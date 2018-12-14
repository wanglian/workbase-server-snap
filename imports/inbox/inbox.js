import './inbox.html';

Template.InboxMenu.events({
  "click #btn-add-channel"(e, t) {
    e.preventDefault();
    Modal.show('AddChannelModal', null, {
      backdrop: 'static',
      keyboard: false
    });
  },
  "click #btn-add-roster"(e, t) {
    e.preventDefault();
    Modal.show('AddRosterModal', null, {
      backdrop: 'static',
      keyboard: false
    });
  }
});
