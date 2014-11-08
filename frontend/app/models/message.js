import DS from 'ember-data';

var Message = DS.Model.extend({
  from: DS.attr('string'),
  to: DS.attr('string'),
  content: DS.attr('string')
});

Message.reopenClass({
  FIXTURES: [
    { id: 1, content: 'hello' },
    { id: 2, content: 'goodbye' },
    { id: 3, content: 'ok' }
  ]
});

export default Message;
