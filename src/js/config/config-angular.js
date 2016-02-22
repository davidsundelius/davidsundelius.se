/* global angular */
'use strict';

var app = angular.module('dse', []);

app.config(['$logProvider', function($logProvider) {
  if(document.cookie.indexOf('debug=true') > -1) {
    $logProvider.debugEnabled(true);
  } else {
    $logProvider.debugEnabled(true);
  }
}]);

app.run(['$log', function($log) {
  $log.debug('ConfigAngular - Starting the dse-app');
}]);
