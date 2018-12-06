ApplicationController = RouteController.extend({
  layoutTemplate: 'ApplicationLayout',
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    if (Meteor.userId()) {
      return this.subscribe('instance');
    } else {
      this.redirect('/'); // 未登录返回到首页
    }
  },
  onStop: function() {

  }
});