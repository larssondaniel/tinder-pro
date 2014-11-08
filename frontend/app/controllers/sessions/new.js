import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    create: function() {
      var payload = {
	FACEBOOK_ID: this.get('email'),
	FACEBOOK_TOKEN: this.get('password')
      };
      
      Ember.$.post('/sign_in', payload).then(function(response) {
	console.log(response);
      });
    }
  }
});
