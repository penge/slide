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

  var applyLimits = function(jslider) {
    jslider.setCount(Math.min(100, jslider.getCount()));
    return jslider;
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
    if (!JSlider.areSettingsValid(settings)) {
      return;
    }
    var jslider = applyLimits(new JSlider(settings));
    setJslider(jslider);
  };

  var preview = function(jslider) {
    new Previewer(jslider.getHtml(), jslider.getCss()).preview();
  };

  var getJslider = function() {
    if (_inputs === null) {
      return;
    }
    return _inputs.getJslider();
  };

  var setJslider = function(jslider) {
    if (_inputs === null) {
      return;
    }
    _inputs.setJslider(jslider);
    preview(_inputs.getJslider());
  };

  return {
    init: init,
    getJslider: getJslider,
    setJslider: setJslider,
  };
})();
