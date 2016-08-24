'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '.participants-dialog',
  initialize: function() {
    this.$el.find('.button-ok').on('click', this.createConversation.bind(this));
    this.users = window.layerSample.users;
  },
  render: function() {
    if (!this.users) return;
    this.$list = this.$el.find('.participant-list');
    this.$list.empty();
    this.users.forEach(this.addUser, this);
  },
  addUser: function(participant) {
    if (participant !== this.user) {
      this.$list.append(
        '<div class="participant-item">' +
          '<label for="participant-checkbox-' + participant + '">' + participant + '</label>' +
          '<input value="' + participant + '" ' +
              'id="participant-checkbox-' + participant + '" ' +
              'type="checkbox" ' +
              'name="userList"/>' +
        '</div>'
      );
    }
  },
  createConversation: function() {
    var participants = [];
    this.$el.find('input:checked').each(function(i, input) {
      participants.push(input.value);
    });
    this.trigger('conversation:create', participants);
    this.$el.addClass('hidden');
  },
  events: {
    'click .participant-list-container': 'clickStopPropagation',
    'click': 'hide'
  },
  clickStopPropagation: function(e) {
    e.stopPropagation();
  },
  show: function() {
    this.$el.removeClass('hidden');
    this.render();
  },
  hide: function() {
    this.$el.addClass('hidden');
    Backbone.history.navigate('/', {trigger: true});
  }
});
