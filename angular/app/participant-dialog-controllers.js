/* global angular */
'use strict';

var controllers = angular.module('participantDialogControllers', []);

/**
 * The New Conversation Controller provides a UI for creating a new Conversation.
 * This consists of a place to edit a title bar, a list of users to select,
 * and a place to enter a first message.
 */
controllers.controller('participantsDialogCtrl', function($scope) {
  /**
   * Hacky DOMish way of getting the selected users
   * Angular developers should feel free to improve on this
   * and submit a PR :-)
   */
  function getSelectedUsers() {
    var result = Array.prototype.slice.call(document.querySelectorAll('.participant-list :checked'))
      .map(function(node) {
        return node.value;
      });
    return result;
  }

  /**
   * On typing a message and hitting ENTER, the send method is called.
   * $scope.chatCtrlState.currentConversation is a basic object; we use it to get the
   * Conversation instance and use the instance to interact with Layer Services
   * sending the Message.
   *
   * See: http://static.layer.com/sdk/docs/#!/api/layer.Conversation
   *
   * For this method, we simply do nothing if no participants;
   * ideally, some helpful error would be reported to the user...
   *
   * Once the Conversation itself has been created, update the URL
   * to point to that Conversation.
   */
  $scope.createConversation = function() {
    // Get the userIds of all selected users
    var participants = getSelectedUsers();

    if (participants.length) {

      // Create the Conversation
      var conversationInstance = $scope.appCtrlState.client.createConversation({
        participants: participants,
        distinct: participants.length === 1,
      });

      // Update our location.
      location.hash = '#' + conversationInstance.id.substring(8);
      Array.prototype.slice.call(document.querySelectorAll('.participant-list :checked')).forEach(function(input) {
        input.checked = false;
      });
    }
  };
});
