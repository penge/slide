window.Previewer = (function() {
  'use strict';

  function Previewer(id, html, css) {
    this.id   = id;
    this.html = html;
    this.css  = css;
  }

  Previewer.prototype.preview = function() {
    this.previewHtml();
    this.previewCss();
  }

  Previewer.prototype.previewHtml = function() {
    $(this.id).html(this.html);  
  }
  
  Previewer.prototype.previewCss = function() {
    var style       = document.createElement('style');
    style.type      = 'text/css';
    style.innerHTML = this.css;

    $('body style').remove();
    document.body.appendChild(style);
  }

  return Previewer;
})();
