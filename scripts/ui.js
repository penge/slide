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
      .hide($('#js'));
  };

  var initLinksEvents = function() {
    $(document).on('click', '.link', function() {
      Element
        .deactivate($('.link'))
        .activate($(this))
        .hide($('code'))
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

  var updateIfNeeded = function($input, code) {
    var value = $input.val();
    var integerValue = parseInt(value);
    if (!value || (value == integerValue && integerValue < 1) || Key.isUpDownArrow(code)) {
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
    var limitedSlide = new Limiter(100, 4000).limit(new Slide(settings));
    setSlide(limitedSlide);
  };

  var preview = function(slide) {
    new Previewer(slide).preview();
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

    var oldSlide = getSlide();
    var newSlide = slide;

    _inputs.setSlide(newSlide);
    
    if (oldSlide && newSlide && newSlide.equals(oldSlide)) {
      return;
    }

    preview(_inputs.getSlide());
  };

  return {
    init: init,
    getSlide: getSlide,
    setSlide: setSlide,
  };
})();
