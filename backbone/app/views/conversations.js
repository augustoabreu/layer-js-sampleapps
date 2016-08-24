'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '.conversation-list',
  newConversation: function() {
    this.$el.find('.participant').removeClass('selected-conversation');
  },
  render: function() {
    if (!this.conversations) return;
    console.log('render: ' + this.conversations.length + ' Conversations');

    this.$el.empty();
    this.conversations.forEach(function(conversation) {
      var ownerId = conversation.getClient().userId;
      var uuid = conversation.id.substr(conversation.id.lastIndexOf('/') + 1); // extract just UUID
      var unread = conversation.unreadCount !== 0 ? 'unread-messages ' : '';
      var participants = conversation.participants;
      var client = conversation.getClient();

      var title = conversation.metadata.title;
      if (!title) {
        title = participants
        .filter(function(user) {
          return user !== ownerId;
        })
        .join(', ').replace(/(.*),(.*?)/, '$1 and$2');
      }

      var selectedClass = '';
      if (this.conversation && conversation.id === this.conversation.id) selectedClass = 'selected-conversation';

      this.$el.append('<a class="conversation-item ' + unread + selectedClass + '" href="#conversations/' + uuid + '">' +
                        '<div class="info">' +
                          '<div class="main">' +
                            '<span class="title">' + title + '</span>' +
                            '<span class="delete fa fa-times-circle" title="Delete conversation" data-id="' + conversation.id + '"></span>' +
                          '</div>' +
                        '</div>' +
                      '</a>');
    }, this);
  },
  events: {
    'click .delete': 'deleteConversation'
  },
  deleteConversation: function(e) {
    e.preventDefault();
    this.trigger('conversation:delete', Backbone.$(e.target).data('id'));
  }
});
