'use strict';
require('angular');
require('ui.router');
require('bootstrap/css/bootstrap.css');
require('bootstrap/js/bootstrap.js');
require('css/component.css');
require('css/style.css');
angular.module('moxtax', ['ui.router']).config(require('./route'));

require('./home');
