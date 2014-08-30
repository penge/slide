window.UI = (function() { 
  'use strict';

  var jslider;
  var inputs;

  var init = function(settings) {
    jslider    = settings.jslider;
    inputs     = settings.inputs;

    initInputs(jslider);
    initInputsEvents();
    initLinks();
    initLinksEvents();
    initCheckboxesEvents();

    preview(jslider);
  };

  var isActive = function(el) {
    return el.hasClass('active'); 
  };

  var activate = function(el) {
    el.addClass('active');
  };

  var deactivate = function(el) {
    el.removeClass('active');
  };

  var initInputs = function(jslider) {
    inputs.$id.val(jslider.getId());
    inputs.$count.val(jslider.getCount());
    inputs.$width.val(jslider.getWidth());
    inputs.$height.val(jslider.getHeight());
    inputs.$duration.val(jslider.getDuration());

    initCustomTotalWidthInput(jslider);
    initCustomWidthInputs(jslider);
  };

  var initCustomTotalWidthInput = function(jslider) {
    inputs.$customTotalWidth.val(jslider.getCustomTotalWidth());
  };

  var initCustomWidthInputs = function(jslider) {
    var $settings = $('#settings');
    $settings.find('.custom-width-setting').remove();
    $settings.append(createCustomWidthInputs(jslider));
  };

  var createCustomWidthInputs = function(jslider) {
    var buffer = [];
    var $template = $('#custom-width-template').clone();

    for (var i = 0, count = jslider.getCount(); i < count; i++) {
      $template.find('.id').text(i + 1);
      $template.find('input').attr('value', jslider.getWidth());
      buffer.push($template.html());
    }
    return buffer;
  };

  var getKeyCode = function(e) {
      return (e.keyCode || e.which);
  };

  var isAnArrowKey = function(code) {
    return code == 37 || code == 38 || code == 39 || code == 40;
  };

  var initInputsEvents = function() {
    $(document).on('keyup', '.input', function(e) {
      if (isAnArrowKey(getKeyCode(e))) {
        return;
      }
      update($(this).attr('id'));
    }).on('change', '.input', function() {
      update($(this).attr('id'));
    });
  };

  var initLinks = function() {
    activate($('#html-link'));
    $('#css').hide();
  };

  var initLinksEvents = function() {
    $(document).on('click', '.link', function() {
      // deactive all links, hide all codes
      deactivate($('.link'));
      $('.code').hide();
      
      // activate specific link, show specific code
      activate($(this));
      var codeId = '#' + $(this).attr('id').replace('-link','');
      $(codeId).show();
    });
  };

  var initCheckboxesEvents = function() {
    $(document).on('change', '.checkbox', function() {
      var $this = $(this);
      var isChecked = $this.is(':checked');
      var $setting = $this.closest('.setting');
      $setting.toggleClass('active', isChecked); 
      $setting.find('.input').prop('tabindex', isChecked ? 0 : -1);
    });
  };

  var getSettings = function() {
    var settings = {
      id:       inputs.$id.val(),
      count:    parseInt(inputs.$count.val()),
      width:    parseInt(inputs.$width.val()),
      height:   parseInt(inputs.$height.val()),
      duration: parseInt(inputs.$duration.val()),
    };

    if (isActive(inputs.$customTotalWidth.closest('.setting'))) {
      settings.customTotalWidth = parseInt(inputs.$customTotalWidth.val());
    }

    return settings;
  };

  var canUpdate = function(settings) {
    return new JSlider().setSettings(settings);
  };

  var update = function(sender) {
    var settings = getSettings();
    
    // Prevent updating if users' inputs are blank or wrong
    if (!canUpdate(settings)) {
      return;
    }

    jslider = new JSlider(settings);
    preview(jslider);
  };

  var preview = function(jslider) {
    var html = jslider.getHtml();
    var css  = jslider.getCss();

    new Previewer(html, css).preview();
  };

  return {
    init: init,
  };
})();
