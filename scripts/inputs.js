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
    if (!slide) {
      return;
    }
    _slide = slide;
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

  var set = function($input, newValue) {
    if ($input.val() === newValue.toString()) {
      return;
    }
    $input.val(newValue);
  };

  var setId = function() {
    set(_inputs.$id, _slide.getId());
  };

  var setCount = function() {
    set(_inputs.$count, _slide.getCount());
  };

  var setWidths = function() {
    var isArray = _slide.isWidthsArray();
    var value = isArray ? _slide.getLargestBoxWidth() : _slide.getWidths();
    Template.init(Element.getClosestSetting(_inputs.$widths), null, value, !isArray);
    if (isArray) {
      if (Element.isEmpty($('#individual-widths'))) {
        recreateWidthsInputs(isArray);
      }
    } else {
      $('#individual-widths').empty();
    }
  };
  
  var setWidth = function() {
    var max = _slide.getMaximumVisibleWidth(); 
    var current = _slide.getWidth() || max;
    var value = Math.min(current, max); 
    Template.init(Element.getClosestSetting(_inputs.$width), null, value, !!_slide.getWidth());
  };

  var setHeight = function() {
    set(_inputs.$height, _slide.getHeight());
  };

  var setDuration = function() {
    set(_inputs.$duration, _slide.getDuration());
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
    var widthsInputs = $('.widths-input:visible');
    if (!widthsInputs.length) {
      for (var i = 0, count = _slide.getCount(); i < count; i++) {
        widthsArray.push(this.getWidths());
      }
    } else {
      $.each(widthsInputs, function(i, input) {
        widthsArray.push(parseInt($(input).val()));
      }); 
    }
    return widthsArray;
  };

  Inputs.prototype.getProperWidth = function() {
    if (Element.isChecked($('#width-checkbox'))) {
      return this.getWidth();
    }
    return null;
  };

  return Inputs;
})();
