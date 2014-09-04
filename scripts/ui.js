window.UI = (function() {
  'use strict';

  var _inputs;

  var init = function(inputs) {
    _inputs = inputs;
    initLinks();
    initLinksEvents();
    initInputsEvents();
    initCheckboxesEvents();
    return this;
  };

  var initLinks = function() {
    Element
      .activate($('#html-link'))
      .hide($('#css'));
  };

  var initLinksEvents = function() {
    $(document).on('click', '.link', function() {
      Element
        .deactivate($('.link'))
        .activate($(this))
        .hide($('.code'))
        .show($('#' + $(this).attr('id').replace('-link','')));
    });
  };

  var initInputsEvents = function() {
    $(document).on('keyup', '.input', function(e) {
      updateIfNeeded($(this), Key.getKeyCode(e));
    });
  };

  var initCheckboxesEvents = function() {
    $(document).on('change', '.checkbox', function() {
      update();
    });
  };

  var applyLimits = function(slide) {
    slide.setCount(Math.min(100, slide.getCount()));
    return slide;
  };

  var updateIfNeeded = function($input, code) {
    var value = $input.val();
    var integerValue = parseInt(value);
    if (!value || (value == integerValue && integerValue < 2) || Key.isUpDownArrow(code)) {
      return;
    }
    if (Key.isBackspace(code) || Key.isCharacter(code) || Key.isNumber(code)) {
      update();
    }
  };

  var update = function() {
    var settings = _inputs.getSettings();
    if (!Slide.areSettingsValid(settings)) {
      return;
    }
    var slide = applyLimits(new Slide(settings));
    setSlide(slide);
  };

  var preview = function(slide) {
    new Previewer(slide.getHtml(), slide.getCss()).preview();
  };

  var getSlide = function() {
    if (_inputs === null) {
      return;
    }
    return _inputs.getSlide();
  };

  var setSlide = function(slide) {
    if (_inputs === null) {
      return;
    }
    _inputs.setSlide(slide);
    preview(_inputs.getSlide());
  };

  return {
    init: init,
    getSlide: getSlide,
    setSlide: setSlide,
  };
})();
