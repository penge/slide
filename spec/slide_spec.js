describe('Slide', function() {

  var slide = null;
  var slideArray = null;

  beforeEach(function() {
    slide = new Slide({
      id: 'my-news',
      count: 4,
      widths: 200,
      width: 600,
      height: 120,
      duration: 100,
    });

    slideArray = new Slide({
      id: 'my-news',
      count: 4,
      widths: [100, 600, 200, 100],
      width: 600,
      height: 120,
      duration: 100,
    });
  });

  describe('init', function() {

    it('properly sets variables', function() {
      expect(slide.getId()).toBe('my-news');
      expect(slide.getCount()).toBe(4);
      expect(slide.getWidths()).toBe(200);
      expect(slide.getWidth()).toBe(600);
      expect(slide.getHeight()).toBe(120);
      expect(slide.getDuration()).toBe(100);

      expect(slideArray.getWidths().length).toBe(4);
      expect(slideArray.getWidths()[0]).toBe(100);
      expect(slideArray.getWidths()[1]).toBe(600);
      expect(slideArray.getWidths()[2]).toBe(200);
      expect(slideArray.getWidths()[3]).toBe(100);
    });
    
    it('throws error for wrong/missing settings', function() {
      expect(function() { new Slide(); }).toThrowError('Wrong or missing id!');
      expect(function() { new Slide({id: 'news'}); }).toThrowError('Wrong or missing count!');
      expect(function() { new Slide({id: 'news', count: 10}); }).toThrowError('Wrong or missing widths!');
      expect(function() { new Slide({id: 'news', count: 10, widths: 200}); }).toThrowError('Wrong or missing height!');
      expect(function() { new Slide({id: 'news', count: 10, widths: 200, height: 200}); }).toThrowError('Wrong or missing duration!');
      expect(function() { new Slide({id: 'news', count: 10, widths: 200, height: 200, duration: 100}); }).not.toThrowError();
    });
  });

  describe('.getExampleSettings', function() {

    it('returns correct example settings', function() {
      expect(Slide.getExampleSettings()).toEqual({
        id: 'news',
        count: 10,
        widths: 200,
        width: 1000,
        height: 200,
        duration: 100,
      });
    });
  });

  describe('.areSettingsValid', function() {

    it('returns true for valid settings', function() {
      expect(Slide.areSettingsValid({
        id: 'news',
        count: 10,
        widths: 200,
        width: 1000,
        height: 200,
        duration: 100,
      })).toBe(true);
    });

    it('returns false for invalid settings', function() {
      // it is ok to omit some keys here
      expect(Slide.areSettingsValid({
        count: 10,
        widths: 200.2, // invalid value
      })).toBe(false);

      // all required keys must be present in aggressive check 
      expect(Slide.areSettingsValid({
        id: 'news',
        // count: 10, // count is required
        widths: 200,
        height: 200,
        duration: 100,
      }, true)).toBe(false);
    });
  });

  describe('#getSettings', function() {

    it('returns correct settings', function() {
      expect(slide.getSettings()).toEqual({
        id: 'my-news',
        count: 4,
        widths: 200,
        width: 600,
        height: 120,
        duration: 100,
      });

      expect(slideArray.getSettings()).toEqual({
        id: 'my-news',
        count: 4,
        widths: [100, 600, 200, 100],
        width: 600,
        height: 120,
        duration: 100,
      });
    });
  });

  describe('#setSettings', function() {

    var settings = null;

    beforeEach(function() {
      settings = {
        id: 'my-news',
        count: 8,
        widths: 400,
        width: 1500,
        height: 220,
        duration: 200,
      };
    });

    it('sets new settings and returns true if they are all correct', function() {
      expect(slide.setSettings(settings)).toBe(true);
      expect(slide.getSettings()).toEqual(settings);
    });

    it('sets new settings and returns false if some are incorrect', function() {
      settings.widths = -400;
      expect(slide.setSettings(settings)).toBe(false);
      expect(slide.getWidths()).toEqual(200);
    });

    it('throws error if settings are missing or incorrect in aggressive check', function() {
      var setSettings = function() {
        slide.setSettings(settings, true);
      };

      expect(setSettings).not.toThrowError(); // everything is ok

      settings.widths = -400;
      expect(setSettings).toThrowError(); // widths is invalid

      delete settings.widths;
      expect(setSettings).toThrowError(); // widths is missing
    });
  });

  describe('#setId', function() {

    it('sets new value and returns true if value is correct', function() {
      expect(slide.setId('my-id')).toBe(true);
      expect(slide.getId()).toBe('my-id');
    });

    it('does not set new value and returns false if value is incorrect', function() {
      expect(slide.setId(123)).toBe(false); // only string
      expect(slide.setId('my-news-2')).toBe(false); // only a-z and - are allowed
      expect(slide.setId('n')).toBe(false); // at least two characters
      expect(slide.setId('n-')).toBe(false); // no trailing dash
      expect(slide.setId('-n')).toBe(false); // no trailing dash
      expect(slide.getId()).toBe('my-news');
    });
  });

  describe('#setCount', function() {

    it('sets new value and returns true if value is correct', function() {
      expect(slide.setCount(5)).toBe(true);
      expect(slide.getCount()).toBe(5);
    });

    it('does not set new value and returns false if value is incorrect', function() {
      expect(slide.setCount(-5)).toBe(false); // only positive numbers
      expect(slide.setCount(5.1)).toBe(false); // only integer numbers
      expect(slide.setCount(1)).toBe(false); // at least 2
      expect(slide.getCount()).toBe(4);
    });
  });

  describe('#setWidths', function() {

    it('sets new value and returns true if value is correct', function() {
      expect(slide.setWidths(300)).toBe(true);
      expect(slide.getWidths()).toBe(300);

      expect(slide.setWidths([400, 400, 400, 400])).toBe(true);
      expect(slide.getWidths()).toEqual([400, 400, 400, 400]);
    });

    it('does not set new value and returns false if value is incorrect', function() {
      expect(slide.setWidths(-300)).toBe(false); // only positive numbers
      expect(slide.setWidths([400, 400, 400.75, 400])).toBe(false); // only integer numbers
      expect(slide.setWidths([400, 400])).toBe(false); // array length must follow count
      expect(slide.getWidths()).toBe(200);
    });
  });

  describe('#setWidthsToArray', function() {

    it('sets widths to array if it is number and returns true', function() {
      expect(slide.setWidthsToArray()).toBe(true);
      expect(slide.getWidths()).toEqual([200, 200, 200, 200]);
    });

    it('does not set widths to array if it is array already and returns false', function() {
      expect(slideArray.setWidthsToArray()).toBe(false);
    });
  });

  describe('#isWidthsArray', function() {

    it('returns true if widths is array', function() {
      expect(slideArray.isWidthsArray()).toBe(true);
    });

    it('returns false if widths is not array', function() {
      expect(slide.isWidthsArray()).toBe(false);
    });
  });

  describe('#setWidth', function() {

    it('sets new value and returns true if value is correct', function() {
      expect(slide.setWidth(1000)).toBe(true);
      expect(slide.getWidth()).toBe(1000);
    });

    it('does not set new value and returns false if value is incorrect', function() {
      expect(slide.setWidth(1000.1)).toBe(false); // only positive integer numbers
      expect(slide.getWidth()).toBe(600);
    });
  });

  describe('#setHeight', function() {

    it('sets new value and returns true if value is correct', function() {
      expect(slide.setHeight(500)).toBe(true);
      expect(slide.getHeight()).toBe(500);
    });

    it('does not set new value and returns false if value is incorrect', function() {
      expect(slide.setHeight(500.5)).toBe(false); // only positive integer numbers
      expect(slide.getHeight()).toBe(120);
    });
  });

  describe('#setDuration', function() {

    it('sets new value and returns true if value is correct', function() {
      expect(slide.setDuration(200)).toBe(true);
      expect(slide.getDuration()).toBe(200);
    });

    it('does not set new value and returns false if value is incorrect', function() {
      expect(slide.setDuration(200.2)).toBe(false); // only positive integer numbers
      expect(slide.getDuration()).toBe(100);
    });
  });

  describe('#getTotalWidth', function() {

    it('returns correct total width', function() {
      expect(slide.getTotalWidth()).toBe(800); // 200 * 4
      expect(slideArray.getTotalWidth()).toBe(1000); // 100 + 600 + 200 + 100
    });
  });

  describe('#getBoxWidth', function() {

    it('returns correct box width', function() {
      expect(slide.getBoxWidth(0)).toBe(200);
      expect(slide.getBoxWidth(1)).toBe(200);
      expect(slide.getBoxWidth(2)).toBe(200);
      expect(slide.getBoxWidth(3)).toBe(200);

      expect(slideArray.getBoxWidth(0)).toBe(100);
      expect(slideArray.getBoxWidth(1)).toBe(600);
      expect(slideArray.getBoxWidth(2)).toBe(200);
      expect(slideArray.getBoxWidth(3)).toBe(100);
    });
  });

  describe('#getBoxWidths', function() {

    it('returns correct box widths', function() {
      expect(slide.getBoxWidths()).toEqual([200, 200, 200, 200]);

      expect(slideArray.getBoxWidths()).toEqual([100, 600, 200, 100]);
    });
  });

  describe('#getBoxWidthsByLargest', function() {

    it('returns correct box widths', function() {
      expect(slide.getBoxWidthsByLargest()).toEqual([200, 200, 200, 200]);

      expect(slideArray.getBoxWidthsByLargest()).toEqual([600, 200, 100, 100]);
    });
  });

  describe('#getLargestBoxWidth', function() {

    it('returns correct box width', function() {
      expect(slide.getLargestBoxWidth()).toBe(200);

      expect(slideArray.getLargestBoxWidth()).toBe(600);
    });
  });

  describe('#getMaximumVisibleWidth', function() {

    it('returns correct width', function() {
      expect(slide.getMaximumVisibleWidth()).toBe(600);

      expect(slideArray.getMaximumVisibleWidth()).toBe(400);
    });
  });

  describe('#getVisibleWidth', function() {

    it('returns correct width', function() {
      expect(slide.getVisibleWidth()).toBe(600);

      expect(slideArray.getVisibleWidth()).toBe(400);
    });
  });

  describe('#getBoxOffset', function() {

    it('returns correct box offset', function() {
      expect(slide.getBoxOffset(0)).toBe(0);
      expect(slide.getBoxOffset(1)).toBe(200);
      expect(slide.getBoxOffset(2)).toBe(400);
      expect(slide.getBoxOffset(3)).toBe(600);

      expect(slideArray.getBoxOffset(0)).toBe(0);
      expect(slideArray.getBoxOffset(1)).toBe(100);
      expect(slideArray.getBoxOffset(2)).toBe(700);
      expect(slideArray.getBoxOffset(3)).toBe(900);
    });
  });

  describe('#getBoxDelay', function() {

    it('returns correct box delay', function() {
      expect(slide.getBoxDelay(0)).toBe(0);
      expect(slide.getBoxDelay(1)).toBe(25);
      expect(slide.getBoxDelay(2)).toBe(50);
      expect(slide.getBoxDelay(3)).toBe(75);

      expect(slideArray.getBoxDelay(0)).toBe(0);
      expect(slideArray.getBoxDelay(1)).toBe(10);
      expect(slideArray.getBoxDelay(2)).toBe(70);
      expect(slideArray.getBoxDelay(3)).toBe(90);
    });
  });

  describe('#getBoxDelays', function() {

    it('returns correct box delays', function() {
      expect(slide.getBoxDelays()).toEqual([0, 25, 50, 75]);

      expect(slideArray.getBoxDelays()).toEqual([0, 10, 70, 90]);
    });
  });

  describe('#getCss', function() {
    
    it('returns correct css string', function() {
      var slide = new Slide({
        id: 'images',
        count: 3,
        widths: 500,
        height: 300,
        duration: 150,
      });
      var css = slide.getCss();
      var expectedCss = '' +
        '#images{' +
          'overflow:hidden;' +
          'width:100%;' +
          '}' +
        '#images .slideboxes{' +
          'overflow:hidden;' +
          'position:relative;' +
          'width:1500px;' +
          'height:300px;' +
          'margin-left:-500px;' +
          '}' +
        '#images .slideboxes .slidebox{' +
          'position:absolute;' +
          'float:left;' +
          'width:500px;' +
          'height:300px;' +
          'line-height:300px;' +
          'user-select:none;' +
          '-webkit-user-select:none;' +
          '-moz-user-select:none;' +
          'animation:images 150s linear infinite;' +
          '-webkit-animation:images 150s linear infinite;' +
          '-moz-animation:images 150s linear infinite;' +
          '}' +
        '#images .slideboxes .slidebox:nth-child(1){' +
          'animation-delay:-0s;' +
          '-webkit-animation-delay:-0s;' +
          '-moz-animation-delay:-0s;' +
          '}' +
        '#images .slideboxes .slidebox:nth-child(2){' +
          'animation-delay:-50s;' +
          '-webkit-animation-delay:-50s;' +
          '-moz-animation-delay:-50s;' +
          '}' +
        '#images .slideboxes .slidebox:nth-child(3){' +
          'animation-delay:-100s;' +
          '-webkit-animation-delay:-100s;' +
          '-moz-animation-delay:-100s;' +
          '}' +
        '@keyframes images{100%{transform:translateX(1500px);}}' +
        '@-webkit-keyframes images{100%{-webkit-transform:translateX(1500px);}}' +
        '@-moz-keyframes images{100%{-moz-transform:translateX(1500px);}}' +
        '';

      expect(css).toBe(expectedCss);
    });
  });

  describe('#equals', function() {

    it('returns true for objects with the same settings', function() {
      var a = new Slide({ id: 'news', count: 4, widths: 200, height: 300, duration: 100 });
      var b = new Slide({ id: 'news', count: 4, widths: 200, height: 300, duration: 100 });
      var c = new Slide({ id: 'news', count: 4, widths: [200, 200, 200, 200], height: 300, duration: 100 });

      expect(a.equals(b)).toBe(true);
      expect(a.equals(c)).toBe(true);
    });

    it('returns false for objects with different settings', function() {
      var a = new Slide({ id: 'news', count: 10, widths: 200, height: 200, duration: 100 });
      var b = new Slide({ id: 'data', count: 10, widths: 200, height: 200, duration: 100 });
      var c = new Slide({ id: 'news', count: 33, widths: 200, height: 200, duration: 100 });
      var d = new Slide({ id: 'news', count: 10, widths: 333, height: 200, duration: 100 });
      var e = new Slide({ id: 'news', count: 10, widths: 200, height: 333, duration: 100 });
      var f = new Slide({ id: 'news', count: 10, widths: 200, height: 200, duration: 333 });

      expect(a.equals(b)).toBe(false);
      expect(a.equals(c)).toBe(false);
      expect(a.equals(d)).toBe(false);
      expect(a.equals(e)).toBe(false);
      expect(a.equals(f)).toBe(false);
    });
  });
});
