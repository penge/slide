window.JSlider = (function() {
  'use strict';
  
  var DEFAULTS = {
    id: 'news',
    count: 10,
    height: 200,
    width: 200,
    duration: 100,
    customTotalWidth: null,
  };

  function JSlider(settings) {
    this.setSettings(settings);
  }

  var isNonEmptyString = function(value) {
    return value && !!value.length;
  };

  var isPositiveInteger = function(value) {
    return parseInt(value) === value && value > 0;
  };

  JSlider.prototype.getDefaultSettings = function() {
    return DEFAULTS;
  };

  JSlider.prototype.getSettings = function() {
    return this.settings;
  };

  JSlider.prototype.setSettings = function(settings) {
    this.settings = settings ? settings : {};

    this.setId(this.settings.id);
    this.setCount(this.settings.count);
    this.setWidth(this.settings.width);
    this.setHeight(this.settings.height);
    this.setDuration(this.settings.duration);
    this.setCustomTotalWidth(this.settings.customTotalWidth);
  };

  JSlider.prototype.getId = function() {
    return this.settings.id;
  };

  JSlider.prototype.setId = function(value) {
    this.settings.id = isNonEmptyString(value) ? value : DEFAULTS.id;
  };

  JSlider.prototype.getCount = function() {
    return this.settings.count;
  };

  JSlider.prototype.setCount = function(value) {
    this.settings.count = isPositiveInteger(value) ? value : DEFAULTS.count;
  };

  JSlider.prototype.getWidth = function() {
    return this.settings.width;
  };

  JSlider.prototype.setWidth = function(value) {
    this.settings.width = isPositiveInteger(value) ? value : DEFAULTS.width;
  };

  JSlider.prototype.getHeight = function() {
    return this.settings.height;
  };

  JSlider.prototype.setHeight = function(value) {
    this.settings.height = isPositiveInteger(value) ? value : DEFAULTS.height;
  };

  JSlider.prototype.getDuration = function() {
    return this.settings.duration;
  };

  JSlider.prototype.setDuration = function(value) {
    this.settings.duration = isPositiveInteger(value) ? value : DEFAULTS.duration;
  };

  JSlider.prototype.getTotalWidth = function() {
    return this.getCount() * this.getWidth();
  };

  JSlider.prototype.getCustomTotalWidth = function() {
    return this.settings.customTotalWidth || this.getTotalWidth();
  };

  JSlider.prototype.setCustomTotalWidth = function(value) {
    this.settings.customTotalWidth = isPositiveInteger(value) ? value : DEFAULTS.customTotalWidth; 
  };

  JSlider.prototype.getBoxDelay = function(boxIndex) {
    return parseFloat(((this.getDuration() / this.getCount()) * (boxIndex)).toFixed(3));
  };

  JSlider.prototype.getHtml = function() {
    var html = '';
    html += '<div id="' + this.getId() + '">';
    html += '<div class="boxes">';
    for (var i = 0; i < this.getCount(); i++) {
      html += '<div class="box">' + (i + 1) + '</div>';
    }
    html += '</div>';
    html += '</div>';
    return html;
  };

  JSlider.prototype.getCss = function() {
    var id         = '#' + this.getId();
    var totalWidth = this.getTotalWidth() + 'px';
    var width      = this.getWidth() + 'px';
    var height     = this.getHeight() + 'px';
    var duration   = this.getDuration() + 's';
    var animation  = this.getId();
    var delay      = null;
    var css = '' +
      id + '{' +
        'overflow:hidden;' +
        'width:100%;' +
        '}' +
      id + ' .boxes{' +
        'overflow:hidden;' +
        'position:relative;' +
        'width:' + totalWidth + ';' +
        'height:' + height + ';' +
        'margin-left:-' + width + ';' +
        '}' +
      id + ' .boxes .box{' +
        'position:absolute;' +
        'float:left;' +
        'width:' + width + ';' +
        'height:' + height + ';' +
        'line-height:' + height + ';' +
        'user-select:none;' +
        '-webkit-user-select:none;' +
        '-moz-user-select:none;' +
        'animation:' + animation + ' ' + duration  + ' linear infinite;' +
        '-webkit-animation:' + animation + ' ' + duration  + ' linear infinite;' +
        '-moz-animation:' + animation + ' ' + duration  + ' linear infinite;' +
        '}' +
        '';
    for(var i = 0, count = this.getCount(); i < count; i++) {
      delay = this.getBoxDelay(i) + 's';
      css += '' +
        id + ' .boxes .box:nth-child(' + (i + 1) + '){' +
          'animation-delay:-' + delay + ';' +
          '-webkit-animation-delay:-' + delay + ';' +
          '-moz-animation-delay:-' + delay + ';' +
          '}';
    }
    css += '' +
      '@keyframes ' + animation + '{100%{transform:translateX(' + totalWidth + ');}}' +
      '@-webkit-keyframes ' + animation + '{100%{-webkit-transform:translateX(' + totalWidth + ');}}' +
      '@-moz-keyframes ' + animation + '{100%{-moz-transform:translateX(' + totalWidth + ');}}' +
      '';

    return css;
  };

  JSlider.prototype.equals = function(other) {
    return JSON.stringify(this.getSettings()) === JSON.stringify(other.getSettings());
  };

  return JSlider;
})();
