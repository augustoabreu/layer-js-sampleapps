'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '.typing-indicator-panel',
  render: function() {
    var text = '';
    if (this.typing && this.typing.length > 0) {
      var names = this.typing;
      var prefix = names.length === 1 ? ' is' : ' are';
      text = names.join(', ').replace(/(.*),(.*?)/, '$1 and$2') + prefix + ' typing...';
    }
    this.$el.text(text);
  }
});
