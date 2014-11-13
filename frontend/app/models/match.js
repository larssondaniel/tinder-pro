import DS from 'ember-data';

var Match = DS.Model.extend({
  peer: DS.belongsTo('user', { async: true }),
  messages: DS.hasMany('message', { async: true })
});

Match.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Pamela', messages: [1,2] },
    { id: 2, name: 'Jess', messages: [3] },
    { id: 3, name: 'Jennifer', messages: [] }
  ]
});

export default Match;
