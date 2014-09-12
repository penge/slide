describe('Limiter', function() {

  var slide = null;
  var slideArray = null;

  var limiter = null;
  var limiterArray = null;

  var limits = {
    maxCount: 30,
    maxWidths: 800,
    maxHeight: 500,
    maxDuration: 900,
  };

  beforeEach(function() {
    slide = new Slide({
      id: 'news',
      count: 200,
      widths: 7000,
      height: 8000,
      duration: 9000,
    });

    slideArray = new Slide({
      id: 'news',
      count: 5,
      widths: [2500, 5000, 50, 100, 7500],
      height: 200,
      duration: 100,
    });

    limiter = new Limiter(slide, limits);
    limiterArray = new Limiter(slideArray, limits);
  });

  describe('#getSlide', function() {

    it('returns the slide', function() {
      expect(limiter.getSlide().equals(slide)).toBe(true);
      expect(limiterArray.getSlide().equals(slideArray)).toBe(true);
    });
  });

  describe('#limit', function() {

    it('calls all limit methods', function() {
      spyOn(limiter, 'limitCount');
      spyOn(limiter, 'limitWidths');
      spyOn(limiter, 'limitHeight');
      spyOn(limiter, 'limitDuration');

      limiter.limit();

      expect(limiter.limitCount).toHaveBeenCalled();
      expect(limiter.limitWidths).toHaveBeenCalled();
      expect(limiter.limitHeight).toHaveBeenCalled();
      expect(limiter.limitDuration).toHaveBeenCalled();
    });

    it('returns limiter', function() {
      expect(limiter.limit()).toEqual(limiter);
    });
  });

  describe('#limitCount', function() {

    it('limits count', function() {
      expect(limiter.limitCount().getSlide().getCount()).toBe(30);
      expect(limiterArray.limitCount().getSlide().getCount()).toBe(5);
    });

    it('returns limiter', function() {
      expect(limiter.limitCount()).toEqual(limiter);
    });
  });

  describe('#limitWidths', function() {

    it('limits widths', function() {
      expect(limiter.limitWidths().getSlide().getWidths()).toBe(800);
      expect(limiterArray.limitWidths().getSlide().getWidths()).toEqual([800, 800, 50, 100, 800]);
    });

    it('returns limiter', function() {
      expect(limiter.limitWidths()).toEqual(limiter);
    });
  });

  describe('#limitHeight', function() {

    it('limits height', function() {
      expect(limiter.limitHeight().getSlide().getHeight()).toBe(500);
      expect(limiterArray.limitHeight().getSlide().getHeight()).toBe(200);
    });

    it('returns limiter', function() {
      expect(limiter.limitHeight()).toEqual(limiter);
    });
  });

  describe('#limitDuration', function() {

    it('limits duration', function() {
      expect(limiter.limitDuration().getSlide().getDuration()).toBe(900);
      expect(limiterArray.limitDuration().getSlide().getDuration()).toBe(100);
    });

    it('returns limiter', function() {
      expect(limiter.limitDuration()).toEqual(limiter);
    });
  });
});
