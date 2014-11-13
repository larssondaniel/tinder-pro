import DS from 'ember-data';

export default DS.Model.extend({
  extension: DS.attr('string'),
  user: DS.belongsTo('user'),

  fileName: function() {
    return this.get('id') + '.' + this.get('extension');
  }.property('id', 'extension')
});
