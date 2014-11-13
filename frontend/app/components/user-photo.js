import Ember from 'ember';

export default Ember.Component.extend({
  url: function() {
    var model = this.get('model');
    var host = 'images.gotinder.com';
    var fileName = '320x320_' + model.get('fileName');
    return 'http://' + host + '/' + model.get('user.id') + '/' + fileName;
  }.property(),
  
  didInsertElement: function() {
    Ember.run.next(function () {
      Holder.run();
    });
  }
});
