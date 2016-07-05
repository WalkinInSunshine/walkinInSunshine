const angular = require('angular');
const angmaps = require('angular-google-maps');
const logger = require('angular-simple-logger');
const lodash = require('lodash');


const wisApp = angular.module('wisApp', [require('angular-route'), require('angular-resource'), 'uiGmapgoogle-maps']);
console.log('Entry.js');

require('./services')(wisApp);
require('./map')(wisApp);
wisApp.config(['$routeProvider', function($rp) {
  $rp
  .when('/map', {
    controller: 'MapController',
    controllerAs: 'mapctrl'
  })
  .otherwise({
    redirectTo: '/map'
  });
}]);

wisApp.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBCdIJyYnX1aGpGRp_MDOYRsCyhgkR39dQ',
    v: '3.24',
    libraries: 'weather,geometry,visualization'
  });
}]);
