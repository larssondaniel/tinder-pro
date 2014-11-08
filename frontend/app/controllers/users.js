import Ember from 'ember';

export default Ember.ArrayController.extend({
  index: 0,

  currentUser: function() {
    if(this.get('index') < this.get('length')) {
      return this.objectAt(this.get('index'));
    } else {
      return undefined;
    }
  }.property('index'),

  next: function() {
    this.set('index', this.get('index') + 1);  
  },
  
  actions: {
    like: function() {
      this.next();
    },
    pass: function() {
      this.next();
    }
  }
});
