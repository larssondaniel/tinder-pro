import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('matches', function() {
    this.route('match', { path: '/:match_id' });
  });
  this.route('users');
  this.route('sessions/new', { path: '/login' });
});

export default Router;
