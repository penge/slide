window.UI = (function() { 
  'use strict';

  var jslider;
  var inputs;
  var checkboxes;

  var init = function(settings) {
    jslider    = settings.jslider;
    inputs     = settings.inputs;
    checkboxes = settings.checkboxes;

    initInputs(jslider);
    initInputsEvents();
    initLinks();
    initLinksEvents();
    initCheckboxesEvents();

    preview(jslider);
  };

  var initInputs = function(jslider) {
    inputs.$id.val(jslider.getId());
    inputs.$count.val(jslider.getCount());
    inputs.$width.val(jslider.getWidth());
    inputs.$height.val(jslider.getHeight());
    inputs.$duration.val(jslider.getDuration());

    initAdvancedInputs(jslider);
  };

  var initAdvancedInputs = function(jslider) {
    inputs.$customTotalWidth.val(jslider.getCustomTotalWidth());
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
    $('#html-link').addClass('active');
    $('#css').hide();
  };

  var initLinksEvents = function() {
    $('.link').click(function() {
      // deactive all links, hide all codes
      $('.link').removeClass('active');
      $('.code').hide();
      
      // activate specific link, show specific code
      $(this).addClass('active');
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

  var isAdvancedEdit = function() {
    return checkboxes.$advanced.is(':checked');
  };

  var preview = function(jslider) {
    var html = jslider.getHtml();
    var css  = jslider.getCss();

    new Previewer(html, css).preview();
  };

  var getSettings = function() {
    var settings = {
      id:       inputs.$id.val(),
      count:    parseInt(inputs.$count.val()),
      width:    parseInt(inputs.$width.val()),
      height:   parseInt(inputs.$height.val()),
      duration: parseInt(inputs.$duration.val()),
    };

    if (isAdvancedEdit()) {
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
    if (!isAdvancedEdit()) {
      initAdvancedInputs(jslider);
    }
    preview(jslider);
  };

  return {
    init: init,
  };
})();
