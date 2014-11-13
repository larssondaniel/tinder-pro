import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('matches', function() {
    this.route('match', { path: '/:match_id' });
  });
  this.route('sessions/new', { path: '/login' });
  this.route('user', { path: '/users/:user_id' });
  this.route('users/recommendations');
});

export default Router;
