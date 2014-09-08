window.Template = (function() {
  'use strict';

  var setId = function(id) {
    $(this).find('.id').text(id);
  };

  var setInput = function(value) {
    var $input = $(this).find('.input');
    if ($input.prop('value') === value.toString()) {
      return;
    }
    $input.prop('value', value);
  };

  var check = function() {
    $(this).addClass('active');
    $(this).find('.checkbox').prop('checked', true);
    $(this).find('.input').prop('tabindex', null);
  };

  var uncheck = function() {
    $(this).removeClass('active');
    $(this).find('.checkbox').prop('checked', false);
    $(this).find('.input').prop('tabindex', -1);
  };

  var toggleCheck = function(checked) {
    if (checked) {
      this.check();
    } else {
      this.uncheck();
    }
  };

  var addMembers = function($template) {
    $template.setId = setId;
    $template.setInput = setInput;
    $template.check = check;
    $template.uncheck = uncheck;
    $template.toggleCheck = toggleCheck;
  };

  var clone = function(templateId, idValue, inputValue, checked) {
    var $element = $(templateId).clone();
    return init($element, idValue, inputValue, checked);
  };

  var init = function($element, idValue, inputValue, checked) {
    addMembers($element);
    initId($element, idValue);
    initInput($element, inputValue);
    initChecked($element, checked);  
    return $element;
  };

  var initId = function($element, idValue) {
    if (idValue) {
      $element.setId(idValue);
    }
  };

  var initInput = function($element, inputValue) {
    if (inputValue) {
      $element.setInput(inputValue);
    }
  };

  var initChecked = function($element, checked) {
    if (checked === true || checked === false) {
      $element.toggleCheck(checked);
    }
  };

  return {
    clone: clone,
    init: init,
  };
})();
