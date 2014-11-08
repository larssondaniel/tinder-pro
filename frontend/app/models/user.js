import DS from 'ember-data';

var User = DS.Model.extend({
  name: DS.attr('string')
});

User.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Pamela' },
    { id: 2, name: 'Jess' },
    { id: 3, name: 'Jennifer' }
  ]
});

export default User;
