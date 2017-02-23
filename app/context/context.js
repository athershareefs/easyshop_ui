var Login = require('./../login/models/login_wrapper');
var Profile = require('./../profile/models/profile');
var Catalog = require('./../catalog/models/catalog');
var LoginListeners = require('./../login/models/listeners');
var ProfileListeners = require('./../profile/models/listeners');
var CatalogListeners = require('./../catalog/models/listeners');
var App = require('./events');
var $ = require('jquery');

var Context = function(eventBus, storage) {
  this.eventBus = eventBus;
  var self = this;
  var login = new Login(eventBus, storage);
  var profile = new Profile(eventBus, storage);
  var catalog = new Catalog(eventBus, storage);

  $.ajaxPrefilter(function( options ) {
    if ( !options.beforeSend) {
        options.beforeSend = function (xhr) { 
            xhr.setRequestHeader('X-AUTH-TOKEN', storage.getItem('authtoken'));
        }
    }
  });
  this.models = {
    userLogin: login,
    profileModel: profile,
    catalogModel: catalog
  };

  eventBus.on(App.events.models.changed, function() {
    self.eventBus.trigger(App.events.ui.render, self.getState());
  });

  LoginListeners(eventBus, this.models.userLogin);
  ProfileListeners(eventBus, this.models.profileModel);
  CatalogListeners(eventBus, this.models.catalogModel);

  eventBus.trigger(App.events.initComplete, this.getState());
};

Context.prototype.getState = function() {
  var self = this;
  return {
    authInfo: self.models.userLogin.getState(),
    profileModel: self.models.profileModel.getState(),
    catalogModel: self.models.catalogModel.getState()
  };
};

module.exports = Context;