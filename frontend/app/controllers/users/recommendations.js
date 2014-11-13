import Ember from 'ember';

export default Ember.ArrayController.extend({
  index: 0,
  
  user: function() {
    return this.objectAt(this.get('index'));
  }.property('@each', 'index'),

  actions: {
    like: function() {
      this.set('index', this.get('index') + 1);
    },
    pass: function() {
      this.set('index', this.get('index') + 1);
    }
  }
});
