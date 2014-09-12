window.Limiter = (function() {
  'use strict';

  function Limiter(slide, limits) {
    this.slide = slide;
    this.limits = limits;
  }

  Limiter.prototype.getSlide = function() {
    return this.slide;
  };

  Limiter.prototype.limit = function() {
    this.limitCount();
    this.limitWidths();
    this.limitHeight();
    this.limitDuration();
    return this;
  };

  Limiter.prototype.limitCount = function() {
    var limitedCount = Math.min(this.limits.maxCount, this.slide.getCount());
    this.slide.setCount(limitedCount);
    return this;
  };

  Limiter.prototype.limitWidths = function() {
    var widths = this.slide.getWidths();
    if (!this.slide.isWidthsArray()) {
      this.slide.setWidths(Math.min(this.limits.maxWidths, widths));
    } else {
      for (var i = 0, count = widths.length; i < count; i++) {
        widths[i] = Math.min(this.limits.maxWidths, widths[i]);
      }
      this.slide.setWidths(widths);
    }
    return this;
  };

  Limiter.prototype.limitHeight = function() {
    var limitedHeight = Math.min(this.limits.maxHeight, this.slide.getHeight());
    this.slide.setHeight(limitedHeight);
    return this;
  };

  Limiter.prototype.limitDuration = function() {
    var limitedDuration = Math.min(this.limits.maxDuration, this.slide.getDuration());
    this.slide.setDuration(limitedDuration);
    return this;
  };

  return Limiter;
})();
