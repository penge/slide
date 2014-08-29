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
    initAdvancedChangeEvent();

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

  var initInputsEvents = function() {
    $.each(inputs, function(index, input) {
      input.on('keyup', function(e) {
        var code = (e.keyCode || e.which);
        // do nothing if it's an arrow key
        if (code == 37 || code == 38 || code == 39 || code == 40) {
          return;
        }
        update();
      }).on('change', function() {
        update();
      });
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

  var initAdvancedChangeEvent = function() {
    checkboxes.$advanced.change(function() {
      var $this = $(this);
      var isChecked = $this.is(':checked');
      var $settings = $this.siblings('.setting');
      $settings.toggleClass('disabled', !isChecked); 
      $settings.find('input').prop('tabindex', isChecked ? 0 : -1);
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

  var getOptions = function() {
    var id       = inputs.$id.val();
    var count    = parseInt(inputs.$count.val());
    var width    = parseInt(inputs.$width.val());
    var height   = parseInt(inputs.$height.val());
    var duration = parseInt(inputs.$duration.val());

    return {
      id:       id,
      count:    count,
      width:    width,
      height:   height,
      duration: duration, 
    };
  };

  var canUpdate = function(options) {
    return options.id.length > 0 &&
      options.count > 0 &&
      options.width > 0 &&
      options.height > 0 &&
      options.duration > 0;
  };

  var update = function() {
    var options = getOptions();
    
    // Prevent updating if users' inputs are blank or wrong
    if (!canUpdate(options)) {
      return;
    }

    jslider = new JSlider(options);
    initInputs(jslider);
    preview(jslider);
  };

  return {
    init: init,
  };
})();
