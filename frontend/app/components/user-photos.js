import Ember from 'ember';

export default Ember.Component.extend({
  photosAndHolders: Ember.A([undefined, undefined, undefined,
			     undefined, undefined, undefined]),

  photosObserver: function() {
    var model = this.get('model');
    var photosAndHolders = this.get('photosAndHolders');
    
    photosAndHolders.setObjects(
      photosAndHolders.map(function(item, index) {
	return model.objectAt(index);
      })
    );
  }.observes('model.@each')
});
