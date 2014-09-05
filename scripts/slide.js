window.Slide = (function() {
  'use strict';
  
  var EXAMPLE_SETTINGS = {
    id: 'news',
    count: 10,
    widths: 200,
    width: 1000,
    height: 200,
    duration: 100,
  };

  function Slide(settings) {
    this.settings = {};
    this.setSettings(settings, true);
  }

  var isIdString = function(value) {
    if (!value) {
      return false;
    }
    return /^([a-z]+[-]*[a-z]+)+$/.test(value);
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

  Slide.getExampleSettings = function() {
    return EXAMPLE_SETTINGS;
  };

  Slide.prototype.getSettings = function() {
    return this.settings;
  };

  Slide.prototype.setSettings = function(settings, aggressive) {
    var _set = settings ? settings : {};

    var oks = [
      _set.id       || aggressive ? this.setId(_set.id)             : true,
      _set.count    || aggressive ? this.setCount(_set.count)       : true,
      _set.widths   || aggressive ? this.setWidths(_set.widths)     : true,
      _set.width                  ? this.setWidth(_set.width)       : true,
      _set.height   || aggressive ? this.setHeight(_set.height)     : true,
      _set.duration || aggressive ? this.setDuration(_set.duration) : true,
    ];

    var result = oks.indexOf(false) === -1;

    if (aggressive && !result) {
      var keys = Object.keys(EXAMPLE_SETTINGS);
      throw new Error('Wrong or missing ' + keys[oks.indexOf(false)] + '!');
    }

    return result;
  };

  Slide.areSettingsValid = function(settings) {
    return new Slide(EXAMPLE_SETTINGS).setSettings(settings);
  };

  Slide.prototype.getId = function() {
    return this.settings.id;
  };

  Slide.prototype.setId = function(value) {
    var ok = isIdString(value);
    if (ok) {
      this.settings.id = value;
    }
    return ok;
  };

  Slide.prototype.getCount = function() {
    return this.settings.count;
  };

  Slide.prototype.setCount = function(value) {
    var ok = isPositiveInteger(value);
    if (ok) {
      this.settings.count = value;
    }
    return ok;
  };

  Slide.prototype.getWidths = function() {
    return this.settings.widths;
  };

  Slide.prototype.setWidths = function(value) {
    var ok = isPositiveInteger(value) || isPositiveIntegerArray(value, this.getCount());
    if (ok) {
      this.settings.widths = value;
    }
    return ok;
  };

  Slide.prototype.setWidthsToArray = function() {
    if (this.isWidthsArray()) {
      return false;
    }
    var widths = this.getWidths();
    var array = [];
    for (var i = 0, count = this.getCount(); i < count; i++) {
      array.push(widths);
    }
    return this.setWidths(array);
  };

  Slide.prototype.isWidthsArray = function() {
    return this.getWidths() instanceof Array;
  };

  Slide.prototype.getWidth = function() {
    return this.settings.width;
  };

  Slide.prototype.setWidth = function(value) {
    var ok = isPositiveInteger(value);
    if (ok) {
      this.settings.width = value;
    }
    return ok;
  };

  Slide.prototype.getHeight = function() {
    return this.settings.height;
  };

  Slide.prototype.setHeight = function(value) {
    var ok = isPositiveInteger(value);
    if (ok) {
      this.settings.height = value;
    }
    return ok;
  };

  Slide.prototype.getDuration = function() {
    return this.settings.duration;
  };

  Slide.prototype.setDuration = function(value) {
    var ok = isPositiveInteger(value);
    if (ok) {
      this.settings.duration = value;
    }
    return ok;
  };

  Slide.prototype.getTotalWidth = function() {
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

  Slide.prototype.getBoxWidth = function(boxIndex) {
    var widths = this.getWidths();
    if (isPositiveInteger(widths)) {
      return widths;
    }
    return widths[boxIndex];
  };

  Slide.prototype.getBoxWidths = function() {
    var widths = [];
    for (var i = 0, count = this.getCount(); i < count; i++) {
      widths.push(this.getBoxWidth(i));
    }
    return widths;
  };

  Slide.prototype.getBoxOffset = function(boxIndex) {
    var offset = 0;
    for (var i = 0, count = boxIndex; i < count; i++) {
      offset += this.getBoxWidth(i);
    }
    return offset;
  };

  Slide.prototype.getBoxDelay = function(boxIndex) {
    var offset = this.getBoxOffset(boxIndex);
    var portion = offset / this.getTotalWidth();
    var duration = this.getDuration();

    return parseFloat((portion * duration).toFixed(3));
  };

  Slide.prototype.getBoxDelays = function() {
    var delays = [];
    for (var i = 0, count = this.getCount(); i < count; i++) {
      delays.push(this.getBoxDelay(i));
    }
    return delays;
  };

  Slide.prototype.getHtml = function() {
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

  Slide.prototype.getCss = function() {
    var id = this.getId();
    var css = '';
    css += getCssId(id);
    css += getCssBoxes(id, this.getWidth() || this.getTotalWidth(), this.getHeight(), this.getBoxWidth(0));
    css += getCssBoxesBox(id, this.isWidthsArray() ? null : this.getWidths(), this.getHeight(), this.getDuration());
    css += getCssBoxesBoxChild(id, this.isWidthsArray() ? this.getBoxWidths() : null); 
    css += getCssAnimationDelays(id, this.getBoxDelays());
    css += getCssKeyframes(id, this.getTotalWidth());
    return css;
  };

  var getCssId = function(id) {
    return [
      '#' + id,
      '{',
      'overflow:hidden;',
      'width:100%;',
      '}',
    ].join('');
  };

  var getCssBoxes = function(id, width, height, marginLeft) {
    return [
      '#' + id + ' .boxes',
      '{',
      'overflow:hidden;',
      'position:relative;',
      'width:' + width + 'px;',
      'height:' + height + 'px;',
      'margin-left:-' + marginLeft + 'px;',
      '}',
    ].join('');
  };

  var getCssBoxesBox = function(id, width, height, duration) {
      return [
        '#' + id + ' .boxes .box',
        '{',
        'position:absolute;',
        'float:left;',
        (width ? ('width:' + width + 'px;') : ''),
        'height:' + height + 'px;',
        'line-height:' + height + 'px;',
        'user-select:none;',
        '-webkit-user-select:none;',
        '-moz-user-select:none;',
        'animation:' + id + ' ' + duration  + 's linear infinite;',
        '-webkit-animation:' + id + ' ' + duration  + 's linear infinite;',
        '-moz-animation:' + id + ' ' + duration  + 's linear infinite;',
        '}',
      ].join('');
  };

  var getCssBoxesBoxChild = function(id, widths) {
    if (!widths) {
      return '';
    }
    var lines = [];
    for (var i = 0, count = widths.length; i < count; i++) {
      lines.push([
        '#' + id + ' .boxes .box:nth-child(' + (i + 1) + ')',
        '{',
        'width:' + widths[i] + 'px;',
        '}',
      ].join(''));
    }
    return lines.join('');
  };

  var getCssAnimationDelays = function(id, delays) {
    var lines = [];
    for(var i = 0, count = delays.length; i < count; i++) {
      var delay = delays[i] + 's';
      lines.push([
        '#' + id + ' .boxes .box:nth-child(' + (i + 1) + ')',
        '{',
        'animation-delay:-' + delay + ';',
        '-webkit-animation-delay:-' + delay + ';',
        '-moz-animation-delay:-' + delay + ';',
        '}',
      ].join(''));
    }
    return lines.join('');
  };

  var getCssKeyframes = function(id, totalWidth) {
    return [
      '@keyframes ' + id + '{100%{transform:translateX(' + totalWidth + 'px);}}',
      '@-webkit-keyframes ' + id + '{100%{-webkit-transform:translateX(' + totalWidth + 'px);}}',
      '@-moz-keyframes ' + id + '{100%{-moz-transform:translateX(' + totalWidth + 'px);}}',
    ].join('');
  };

  Slide.prototype.equals = function(other) {
    return JSON.stringify(this.getSettings()) === JSON.stringify(other.getSettings());
  };

  return Slide;
})();
