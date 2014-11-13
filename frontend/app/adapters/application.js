import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  headers: function() {
    return {
      'X-Auth-Token': localStorage.getItem('token')
    };
  }.property(),
  namespace: 'api'
});
