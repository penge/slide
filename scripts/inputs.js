window.Inputs = (function() {
  'use strict';

  var _inputs;
  var _slide;

  function Inputs(inputs, slide) {
    _inputs = inputs;
    this.setSlide(slide);
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

  Inputs.prototype.getSlide = function() {
    return _slide;
  };

  Inputs.prototype.setSlide = function(slide) {
    _slide = slide;
    if (!_slide) {
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
    _inputs.$id.val(_slide.getId());
  };

  var setCount = function() {
    _inputs.$count.val(_slide.getCount());
  };

  var setWidths = function() {
    var isArray = _slide.isWidthsArray();
    var value = isArray ? Slide.getExampleSettings().widths : _slide.getWidths();
    Template.init(Element.getClosestSetting(_inputs.$widths), null, value, !isArray);
    recreateWidthsInputs(isArray);
  };
  
  var setWidth = function() {
    var value = _slide.getWidth() || _slide.getTotalWidth();
    _inputs.$width.val(value);
    Template.init(Element.getClosestSetting(_inputs.$width), null, value, _slide.getWidth() !== null);
  };

  var setHeight = function() {
    _inputs.$height.val(_slide.getHeight());
  };

  var setDuration = function() {
    _inputs.$duration.val(_slide.getDuration());
  };

  var recreateWidthsInputs = function(active) {
    $('#individual-widths').empty().append(getWidthsInputsBuffer(active));
  };

  var getWidthsInputsBuffer = function(active) {
    var buffer = [];
    var template = '#widths-template .widths-setting';
    for (var i = 0, count = _slide.getCount(); i < count; i++) {
      buffer.push(Template.clone(template, i+1, _slide.getBoxWidth(i), active));
    }
    return buffer;
  };
  
  Inputs.prototype.getProperWidths = function() {
    if (Element.isChecked($('#widths-checkbox')) ||
      this.getCount() != _slide.getCount()) {
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
    return _slide.getWidth() || _slide.getTotalWidth();
  };

  return Inputs;
})();
