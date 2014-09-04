window.JSlider = (function() {
  'use strict';
  
  var DEFAULTS = {
    id: 'news',
    count: 10,
    widths: 200,
    width: null,
    height: 200,
    duration: 100,
  };

  function JSlider(settings) {
    this.settings = settings ? settings : {};

    this.setId(this.settings.id);
    this.setCount(this.settings.count);
    this.setWidths(this.settings.widths);
    this.setWidth(this.settings.width);
    this.setHeight(this.settings.height);
    this.setDuration(this.settings.duration);
  }

  var isIdString = function(value) {
    return value && /^[^-][a-z|-]+[^-]$/.test(value);
  };

  var isPositiveInteger = function(value) {
    return parseInt(value) === value && value > 0;
  };

  var isPositiveIntegerArray = function(array, length) {
    return (array instanceof Array) &&
      array.length === length &&
      array.map(function(num) {
        return isPositiveInteger(num);
      }).indexOf(false) == -1;
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
      _settings.widths ? this.setWidths(_settings.widths) : true,
      _settings.width ? this.setWidth(_settings.width) : true,
      _settings.height ? this.setHeight(_settings.height) : true,
      _settings.duration ? this.setDuration(_settings.duration) : true,
    ];

    return oks.indexOf(false) === -1;
  };

  JSlider.areSettingsValid = function(settings) {
    return new JSlider().setSettings(settings); 
  };

  JSlider.prototype.isWidthsArray = function() {
    return this.getWidths() instanceof Array;
  };

  JSlider.prototype.getId = function() {
    return this.settings.id;
  };

  JSlider.prototype.setId = function(value) {
    var ok = isIdString(value);
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

  JSlider.prototype.getWidths = function() {
    return this.settings.widths;
  };

  JSlider.prototype.setWidths = function(value) {
    var ok = isPositiveInteger(value) || isPositiveIntegerArray(value, this.getCount());
    this.settings.widths = ok ? value : DEFAULTS.widths;
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
    var widths = this.getWidths();
    var count = this.getCount();

    if (!(widths instanceof Array)) {
      return widths * count;
    }

    var result = 0;
    for (var i = 0; i < count; i++) {
      result += widths[i];
    }
    return result;
  };

  JSlider.prototype.getBoxWidth = function(boxIndex) {
    var widths = this.getWidths();
    if (isPositiveInteger(widths)) {
      return widths;
    }
    return widths[boxIndex];
  };

  JSlider.prototype.getBoxWidths = function() {
    var widths = [];
    for (var i = 0, count = this.getCount(); i < count; i++) {
      widths.push(this.getBoxWidth(i));
    }
    return widths;
  };

  JSlider.prototype.getBoxOffset = function(boxIndex) {
    var offset = 0;
    for (var i = 0, count = boxIndex; i < count; i++) {
      offset += this.getBoxWidth(i);
    }
    return offset;
  };

  JSlider.prototype.getBoxDelay = function(boxIndex) {
    var offset = this.getBoxOffset(boxIndex);
    var portion = offset / this.getTotalWidth();
    var duration = this.getDuration();

    return parseFloat((portion * duration).toFixed(3));
  };

  JSlider.prototype.getBoxDelays = function() {
    var delays = [];
    for (var i = 0, count = this.getCount(); i < count; i++) {
      delays.push(this.getBoxDelay(i));
    }
    return delays;
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
    var width      = (this.getWidth() || this.getTotalWidth()) + 'px';
    var translateX = this.getTotalWidth() + 'px';
    var marginLeft = this.getBoxWidth(0) + 'px';
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
        'width:' + width + ';' +
        'height:' + height + ';' +
        'margin-left:-' + marginLeft + ';' +
        '}' +
      id + ' .boxes .box{' +
        'position:absolute;' +
        'float:left;' +
        'width:' + marginLeft + ';' +
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
      '@keyframes ' + animation + '{100%{transform:translateX(' + translateX + ');}}' +
      '@-webkit-keyframes ' + animation + '{100%{-webkit-transform:translateX(' + translateX + ');}}' +
      '@-moz-keyframes ' + animation + '{100%{-moz-transform:translateX(' + translateX + ');}}' +
      '';

    return css;
  };

  JSlider.prototype.equals = function(other) {
    return JSON.stringify(this.getSettings()) === JSON.stringify(other.getSettings());
  };

  return JSlider;
})();
