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
    this.settings = settings ? settings : {};

    this.setId(this.settings.id);
    this.setCount(this.settings.count);
    this.setWidth(this.settings.width);
    this.setHeight(this.settings.height);
    this.setDuration(this.settings.duration);
    this.setCustomTotalWidth(this.settings.customTotalWidth);
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
    var _settings = settings ? settings : {};

    var oks = [
      _settings.id ? this.setId(_settings.id) : true,
      _settings.count ? this.setCount(_settings.count) : true,
      _settings.width ? this.setWidth(_settings.width) : true,
      _settings.height ? this.setHeight(_settings.height) : true,
      _settings.duration ? this.setDuration(_settings.duration) : true,
      _settings.customTotalWidth ? this.setCustomTotalWidth(_settings.customTotalWidth) : true,
    ];

    return oks.indexOf(false) === -1;
  };

  JSlider.areSettingsValid = function(settings) {
    return new JSlider().setSettings(settings); 
  };

  JSlider.prototype.getId = function() {
    return this.settings.id;
  };

  JSlider.prototype.setId = function(value) {
    var ok = isNaN(value) && isNonEmptyString(value);
    this.settings.id = ok ? value : DEFAULTS.id;
    return ok;
  };

  JSlider.prototype.getCount = function() {
    return this.settings.count;
  };

  JSlider.prototype.setCount = function(value) {
    var ok = isPositiveInteger(value);
    this.settings.count = ok ? value : DEFAULTS.count;
    return ok;
  };

  JSlider.prototype.getWidth = function() {
    return this.settings.width;
  };

  JSlider.prototype.setWidth = function(value) {
    var ok = isPositiveInteger(value);
    this.settings.width = ok ? value : DEFAULTS.width;
    return ok;
  };

  JSlider.prototype.getHeight = function() {
    return this.settings.height;
  };

  JSlider.prototype.setHeight = function(value) {
    var ok = isPositiveInteger(value);
    this.settings.height = ok ? value : DEFAULTS.height;
    return ok;
  };

  JSlider.prototype.getDuration = function() {
    return this.settings.duration;
  };

  JSlider.prototype.setDuration = function(value) {
    var ok = isPositiveInteger(value);
    this.settings.duration = ok ? value : DEFAULTS.duration;
    return ok;
  };

  JSlider.prototype.getTotalWidth = function() {
    return this.getCount() * this.getWidth();
  };

  JSlider.prototype.getCustomTotalWidth = function() {
    return this.settings.customTotalWidth || this.getTotalWidth();
  };

  JSlider.prototype.setCustomTotalWidth = function(value) {
    var ok = isPositiveInteger(value);
    this.settings.customTotalWidth = ok ? value : DEFAULTS.customTotalWidth; 
    return ok;
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
    var customTotalWidth = this.getCustomTotalWidth() + 'px';
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
        'width:' + customTotalWidth + ';' +
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
