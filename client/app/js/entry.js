const angular = require('angular');
const angmaps = require('angular-google-maps');

const wisApp = angular.module('wisApp', [require('angular-route'), require('angular-resource'), 'uiGmapgoogle-maps']);

require('./services')(wisApp);
require('./map')(wisApp);

wisApp.config(['$routeProvider', function($rp) {
  $rp
  .when('/map', {
    controller: 'MapController',
    controllerAs: 'mapctrl'
  });
}]);

demoApp.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyAjHPG5y2dcj239xMNVoDzZKWRKO1Xi0oI',
    v: '3.24',
    libraries: 'weather,geometry,visualization'
  });
}]);
