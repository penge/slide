window.Inputs = (function() {
  'use strict';

  var _inputs;
  var _jslider;

  function Inputs(inputs, jslider) {
    _inputs = inputs;
    this.setJslider(jslider);
  }

  Inputs.prototype.getId = function() {
    return _inputs.$id.val().toLowerCase();
  };

  Inputs.prototype.getCount = function() {
    return parseInt(_inputs.$count.val());
  };

  Inputs.prototype.getWidths = function() {
    return parseInt(_inputs.$widths.val());
  };

  Inputs.prototype.getWidth = function() {
    return parseInt(_inputs.$width.val());
  };
  
  Inputs.prototype.getHeight = function() {
    return parseInt(_inputs.$height.val());
  };

  Inputs.prototype.getDuration = function() {
    return parseInt(_inputs.$duration.val());
  };

  Inputs.prototype.getSettings = function() {
    return {
      id:       this.getId(),
      count:    this.getCount(),
      widths:   this.getProperWidths(),
      width:    this.getProperWidth(),
      height:   this.getHeight(), 
      duration: this.getDuration(),
    };
  };

  Inputs.prototype.getJslider = function() {
    return _jslider;
  };

  Inputs.prototype.setJslider = function(jslider) {
    _jslider = jslider;
    if (!_jslider) {
      return;
    }
    setAll();
  };

  var setAll = function() {
    setId();
    setCount();
    setWidths();
    setWidth();
    setHeight();
    setDuration();
  };

  var setId = function() {
    _inputs.$id.val(_jslider.getId());
  };

  var setCount = function() {
    _inputs.$count.val(_jslider.getCount());
  };

  var setWidths = function() {
    var isArray = _jslider.isWidthsArray();
    var value = isArray ? _jslider.getDefaultSettings().widths : _jslider.getWidths();
    Template.init(Element.getClosestSetting(_inputs.$widths), null, value, !isArray);
    recreateWidthsInputs(isArray);
  };
  
  var setWidth = function() {
    var value = _jslider.getWidth() || _jslider.getTotalWidth();
    _inputs.$width.val(value);
    Template.init(Element.getClosestSetting(_inputs.$width), null, value, _jslider.getWidth() !== null);
  };

  var setHeight = function() {
    _inputs.$height.val(_jslider.getHeight());
  };

  var setDuration = function() {
    _inputs.$duration.val(_jslider.getDuration());
  };

  var recreateWidthsInputs = function(active) {
    $('#individual-widths').empty().append(getWidthsInputsBuffer(active));
  };

  var getWidthsInputsBuffer = function(active) {
    var buffer = [];
    var template = '#widths-template .widths-setting';
    for (var i = 0, count = _jslider.getCount(); i < count; i++) {
      buffer.push(Template.clone(template, i+1, _jslider.getBoxWidth(i), active));
    }
    return buffer;
  };
  
  Inputs.prototype.getProperWidths = function() {
    if (Element.isChecked($('#widths-checkbox')) ||
      this.getCount() != _jslider.getCount()) {
      return this.getWidths();
    }
    var widthsArray = [];
    $.each($('.widths-input:visible'), function(i, input) {
      widthsArray.push(parseInt($(input).val()));
    }); 
    return widthsArray;
  };

  Inputs.prototype.getProperWidth = function() {
    if (Element.isChecked($('#width-checkbox'))) {
      return this.getWidth();
    }
    return _jslider.getWidth() || _jslider.getTotalWidth();
  };

  return Inputs;
})();
