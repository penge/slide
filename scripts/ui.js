window.UI = (function() { 
  'use strict';

  var jslider;
  var $id, $count, $width, $height, $duration;

  var init = function(settings) {
    jslider   = settings.jslider;
    $id       = settings.$id;
    $count    = settings.$count;
    $width    = settings.$width;
    $height   = settings.$height;
    $duration = settings.$duration;

    initInputs();
    initLinks();
    preview();
  };

  var initInputs = function() {
    $id.val(jslider.id);
    $count.val(jslider.count);
    $width.val(jslider.width);
    $height.val(jslider.height);
    $duration.val(jslider.duration);

    registerInputsEvents();
  };

  var registerInputsEvents = function() {
    var inputs = [$id, $count, $width, $height, $duration];
    $.each(inputs, function(index, input) {
      input.on('keyup', function(e) {
        var code = (e.keyCode || e.which);
        // do nothing if it's an arrow key
        if(code == 37 || code == 38 || code == 39 || code == 40) {
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

    initLinksEvents();
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

  var preview = function() {
    var html = jslider.getHtml();
    var css  = jslider.getCss();

    new Previewer(html, css).preview();
  };

  var update = function() {
    var id       = $id.val();
    var count    = parseInt($count.val());
    var width    = parseInt($width.val());
    var height   = parseInt($height.val());
    var duration = parseInt($duration.val());

    jslider = new JSlider({
      id:       id,
      count:    count,
      width:    width,
      height:   height,
      duration: duration, 
    });

    preview();
  };

  return {
    init: init,
  };
})();
