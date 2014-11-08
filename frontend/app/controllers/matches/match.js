import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    send: function() {
      var message = this.store.createRecord('message', {
	content: this.get('messageContent')
      });

      message.save();

      this.get('messages').pushObject(message);

      this.set('messageContent', '');
    }
  }
});
