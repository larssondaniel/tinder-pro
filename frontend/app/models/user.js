import DS from 'ember-data';

var User = DS.Model.extend({
  name: DS.attr('string'),
  gender: DS.attr('number'),
  biography: DS.attr('string'),
  photos: DS.hasMany('photo', { async: true })
});

User.reopenClass({
  FIXTURES: [
    { id: '518d666a2a00df0e490000b9', name: 'Pamela', profilePictures: [
      'fea4f480-7ce0-4143-a310-a03c2b2cdbc6',
      '5c1d3231-5a75-4a07-91ff-5c012716583f',
      '5abd87e5-a181-4946-a8b9-880926a78943',
      '5e168698-a034-40c0-b7fb-7c05743f2310'
    ] },
    { id: 2, name: 'Jess' },
    { id: 3, name: 'Jennifer' }
  ]
});

export default User;
