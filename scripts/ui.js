window.UI = (function() { 
  'use strict';

  var jslider;
  var inputs;

  var init = function(settings) {
    jslider = settings.jslider;
    inputs = settings.inputs;

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

  var getKeyCode = function(e) {
    return (e.keyCode || e.which);
  };

  var isAnArrowKey = function(code) {
    return code == 37 || code == 38 || code == 39 || code == 40;
  };

  var initInputs = function(jslider) {
    inputs.$id.val(jslider.getId());
    inputs.$count.val(jslider.getCount());
    inputs.$widths.val(jslider.getWidths());
    inputs.$height.val(jslider.getHeight());
    inputs.$duration.val(jslider.getDuration());

    initWidthInput(jslider);
    initWidthsInputs(jslider);
  };

  var initWidthInput = function(jslider) {
    inputs.$width.val(jslider.getWidth() || jslider.getTotalWidth());
  };

  var initWidthsInputs = function(jslider) {
    var $settings = $('#settings');
    $settings.find('.widths-setting').remove();
    $settings.append(createWidthsInputs(jslider));
  };

  var createWidthsInputs = function(jslider) {
    var buffer = [];
    var $template = $('#widths-template').clone();

    for (var i = 0, count = jslider.getCount(); i < count; i++) {
      $template.find('.id').text(i + 1);
      $template.find('input').attr('value', jslider.getBoxWidth(i));
      buffer.push($template.html());
    }
    return buffer;
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
      if (!isChecked) {
        update('checkbox');
      }
    });
  };

  var getSettings = function() {
    var settings = {
      id:       inputs.$id.val(),
      count:    parseInt(inputs.$count.val()),
      widths:   parseInt(inputs.$widths.val()),
      height:   parseInt(inputs.$height.val()),
      duration: parseInt(inputs.$duration.val()),
    };

    if (isActive(inputs.$width.closest('.setting'))) {
      settings.width = parseInt(inputs.$width.val());
    }

    return settings;
  };

  var reinitInputs = function(sender, jslider) {
    var allowedSenders = [
      'count',
      'widths',
      'checkbox',
    ];
    
    if (allowedSenders.indexOf(sender) == -1) {
      return;
    }

    initWidthInput(jslider);
    initWidthsInputs(jslider);
  };

  var update = function(sender) {
    var settings = getSettings();
    
    // Prevent updating if users' inputs are blank or wrong
    if (!JSlider.areSettingsValid(settings)) {
      return;
    }

    jslider = new JSlider(settings);
    reinitInputs(sender, jslider);
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
