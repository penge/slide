window.JSlider = (function() {
  'use strict';
  
  function JSlider(settings) {
    settings = settings ? settings : {};

    var id       = settings.id;
    var count    = settings.count;
    var width    = settings.width;
    var height   = settings.height;
    var duration = settings.duration;

    this.id       = isNonEmptyString(id)        ? id       : 'news';
    this.count    = isPositiveInteger(count)    ? count    : 10;
    this.width    = isPositiveInteger(width)    ? width    : 200;
    this.height   = isPositiveInteger(height)   ? height   : 200;
    this.duration = isPositiveInteger(duration) ? duration : 100;
  }

  var isNonEmptyString = function(value) {
    return value && !!value.length;
  };

  var isPositiveInteger = function(value) {
    return parseInt(value) === value && value > 0;
  };

  JSlider.prototype.getTotalWidth = function() {
    return this.count * this.width;
  };

  JSlider.prototype.getBoxDelay = function(boxIndex) {
    return parseFloat(((this.duration / this.count) * (boxIndex)).toFixed(3));
  };

  JSlider.prototype.getHtml = function() {
    var html = '';
    html += '<div id="' + this.id + '">';
    html += '<div class="boxes">';
    for (var i = 0; i < this.count; i++) {
      html += '<div class="box">' + (i + 1) + '</div>';
    }
    html += '</div>';
    html += '</div>';
    return html;
  };

  JSlider.prototype.getCss = function() {
    var id         = '#' + this.id;
    var totalWidth = this.getTotalWidth() + 'px';
    var width      = this.width + 'px';
    var height     = this.height + 'px';
    var duration   = this.duration + 's';
    var animation  = this.id;
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
    for(var i = 0, count = this.count; i < count; i++) {
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
    return JSON.stringify(this) == JSON.stringify(other);
  };

  return JSlider;
})();
