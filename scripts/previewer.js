window.Previewer = (function() {
  'use strict';

  var NL = '\n';
  var TAB = '\t';

  function Previewer(slide) {
    this.slide = slide;
  }

  Previewer.prototype.preview = function() {
    this.slide.run();

    var html = this.getHtml();
    var js = this.getJs();

    injectHtml(html);

    previewHtml(html);
    previewJs(js);
  };

  var injectHtml = function(html) {
    $('#html-preview').html(html);  
  };

  var previewHtml = function(html) {
    $('#html').text(html);
  };
  
  var previewJs = function(js) {
    $('#js').text(js);
  };

  Previewer.prototype.getHtml = function() {
    var id = this.slide.getId();
    var count = this.slide.getCount();

    var lines = [];

    lines.push('<div id="' + id + '">');
    lines.push(TAB + '<div class="slideboxes">');
    for (var i = 0; i < count; i++) {
      lines.push(TAB + TAB + '<div class="slidebox">' + (i + 1) + '</div>');
    }
    lines.push(TAB + '</div>');
    lines.push('</div>');

    return lines.join(NL);
  };

  Previewer.prototype.getJs = function() {
    var lines = [];

    lines.push('var slide = new Slide({');
    lines.push(TAB + 'id: "' + this.slide.getId() + '",');
    lines.push(TAB + 'count: ' + this.slide.getCount() + ',');
    if (!this.slide.isWidthsArray()) {
      lines.push(TAB + 'widths: ' + this.slide.getWidths() + ',');
    } else {
      lines.push(TAB + 'widths: [' + this.slide.getWidths().toString().replace(/,/g, ', ') + '],');
    }
    if (this.slide.getWidth()) {
      lines.push(TAB + 'width: ' + this.slide.getWidth() + ',');
    }
    lines.push(TAB + 'height: ' + this.slide.getHeight() + ',');
    lines.push(TAB + 'duration: ' + this.slide.getDuration() + ',');
    lines.push('});' + NL);
    lines.push('slide.run();');

    return lines.join(NL);
  };

  return Previewer;
})();
