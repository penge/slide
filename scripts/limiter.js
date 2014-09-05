window.Limiter = (function() {
  'use strict';

  function Limiter(maxCount, maxWidths) {
    this.maxCount = maxCount;
    this.maxWidths = maxWidths;
  }

  Limiter.prototype.limit = function(slide) {
    this.limitCount(slide);
    this.limitWidths(slide);
    return slide;
  };

  Limiter.prototype.limitCount = function(slide) {
    var limitedCount = Math.min(this.maxCount, slide.getCount());
    slide.setCount(limitedCount);
    return slide;
  };

  Limiter.prototype.limitWidths = function(slide) {
    var widths = slide.getWidths();
    if (!slide.isWidthsArray()) {
      slide.setWidths(Math.min(this.maxWidths, widths));
    } else {
      for (var i = 0, count = widths.length; i < count; i++) {
        widths[i] = Math.min(this.maxWidths, widths[i]);
      }
      slide.setWidths(widths);
    }
    return slide;
  };

  return Limiter;
})();
