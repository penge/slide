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

  describe('setters', function() {

    it('returns true/false for correct/incorrect values', function() {
      expect(slide.setId('my-id')).toBe(true);
      expect(slide.setId(543)).toBe(false);

      expect(slide.setCount(10)).toBe(true);
      expect(slide.setCount(-3)).toBe(false);

      expect(slide.setWidths(200)).toBe(true);
      expect(slide.setWidths(200.7833)).toBe(false);

      slide.setCount(3);
      expect(slide.setWidths([200, 300, 300])).toBe(true);
      expect(slide.setWidths([200])).toBe(false);
      expect(slide.setWidths([200, 300, 300, 300])).toBe(false);
      expect(slide.setWidths([200, 300, -300])).toBe(false);
      expect(slide.setWidths(['a', 'b', 'c'])).toBe(false);

      expect(slide.setWidth(1000)).toBe(true);
      expect(slide.setWidth('1000')).toBe(false);

      expect(slide.setHeight(200)).toBe(true);
      expect(slide.setHeight(-200)).toBe(false);

      expect(slide.setDuration(100)).toBe(true);
      expect(slide.setDuration(100.2)).toBe(false);

      expect(slide.setSettings({count: 4})).toBe(true);
      expect(slide.setSettings({count: -4})).toBe(false);
    });
  });

  describe('#getTotalWidth', function() {

    it('returns correct total width', function() {
      expect(slide.getTotalWidth()).toBe(800); // 200 * 4
      expect(slideArray.getTotalWidth()).toBe(1000); // 100 + 600 + 200 + 100
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
