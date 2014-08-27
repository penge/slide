window.Previewer = (function() {
  'use strict';

  function Previewer(html, css) {
    this.html = html;
    this.css  = css;
  }

  Previewer.prototype.preview = function() {
    this.previewHtml();
    this.previewCss();
  };

  Previewer.prototype.previewHtml = function() {
    $('#html-preview').html(this.html);  
    $('#html').text(this.html);
  };
  
  Previewer.prototype.previewCss = function() {
    $('#css-preview').html(this.css);
    $('#css').text(this.css);
  };

  return Previewer;
})();
