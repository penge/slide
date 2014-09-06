describe('Slide', function() {

  describe('initialization', function() {

    it('properly sets variables // widths is integer', function() {
      var slide = new Slide({
        id: 'my-news',
        count: 4,
        widths: 200,
        width: 600,
        height: 100,
        duration: 300,
      });
      
      expect(slide.getId()).toBe('my-news');
      expect(slide.getCount()).toBe(4);
      expect(slide.getWidths()).toBe(200);
      expect(slide.getWidth()).toBe(600);
      expect(slide.getHeight()).toBe(100);
      expect(slide.getDuration()).toBe(300);
      expect(slide.getTotalWidth()).toBe(800); // 200 * 4
    });

    it('properly sets variables // widths is an array', function() {
      slide = new Slide({
        id: 'my-news',
        count: 4,
        widths: [200, 100, 600, 100],
        width: 700,
        height: 200,
        duration: 400,
      });

      expect(slide.getId()).toBe('my-news');
      expect(slide.getCount()).toBe(4);
      expect(slide.getWidths().length).toBe(4);
      expect(slide.getWidths()[0]).toBe(200);
      expect(slide.getWidths()[1]).toBe(100);
      expect(slide.getWidths()[2]).toBe(600);
      expect(slide.getWidths()[3]).toBe(100);
      expect(slide.getHeight()).toBe(200);
      expect(slide.getDuration()).toBe(400);
      expect(slide.getWidth()).toBe(700);
      expect(slide.getTotalWidth()).toBe(1000); // 200 + 100 + 600 + 100
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

  describe('setters', function() {

    it('returns true/false for correct/incorrect values', function() {
      var slide = new Slide({
        id: 'news',
        count: 10,
        widths: 200,
        height: 300,
        duration: 100, 
      });

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

    it('returns correct total width // widths is an integer', function() {
      var slide = new Slide({
        id: 'news',
        count: 5,
        widths: 300,
        height: 200,
        duration: 100,
      });

      expect(slide.getTotalWidth()).toBe(1500);
    });

    it('returns correct total width // widths is an array', function() {
      var slide = new Slide({
        id: 'news',
        count: 5,
        widths: [100, 100, 100, 200, 300],
        height: 200,
        duration: 100,
      });

      expect(slide.getTotalWidth()).toBe(800);
    });
  });

  describe('#getBoxDelay', function() {

    it('returns correct box delay // widths is a integer', function() {
      var slide = new Slide({
        id: 'news',
        count: 5,
        widths: 200,
        height: 200,
        duration: 100,
      });

      expect(slide.getTotalWidth()).toBe(1000);
      expect(slide.getBoxDelay(0)).toBe(0);
      expect(slide.getBoxDelay(1)).toBe(20);
      expect(slide.getBoxDelay(2)).toBe(40);
      expect(slide.getBoxDelay(3)).toBe(60);
      expect(slide.getBoxDelay(4)).toBe(80);
    });

    it('returns correct box delay // widths is an array', function() {
      var slide = new Slide({
        id: 'news',
        count: 5,
        widths: [100, 500, 100, 300, 100],
        height: 200,
        duration: 100,
      });

      expect(slide.getTotalWidth()).toBe(1100);
      expect(slide.getBoxDelay(0)).toBe(0);
      expect(slide.getBoxDelay(1)).toBe(9.091);
      expect(slide.getBoxDelay(2)).toBe(54.545);
      expect(slide.getBoxDelay(3)).toBe(63.636);
      expect(slide.getBoxDelay(4)).toBe(90.909);
    });
  });

  describe('#getBoxWidth', function() {

    it('returns correct box width // widths is a integer', function() {
      var slide = new Slide({
        id: 'news',
        count: 3,
        widths: 300,
        height: 200,
        duration: 100,
      });

      expect(slide.getBoxWidth(0)).toBe(300);
      expect(slide.getBoxWidth(1)).toBe(300);
      expect(slide.getBoxWidth(2)).toBe(300);
    });

    it('returns correct box width // widths is an array', function() {
      var slide = new Slide({
        id: 'news',
        count: 3,
        widths: [300, 200, 75],
        height: 200,
        duration: 100,
      });

      expect(slide.getBoxWidth(0)).toBe(300);
      expect(slide.getBoxWidth(1)).toBe(200);
      expect(slide.getBoxWidth(2)).toBe(75);
    });
  });

  describe('#getBoxOffset', function() {

    it('returns correct box offset // widths is a integer', function() {
      var slide = new Slide({
        id: 'news',
        count: 3,
        widths: 300,
        height: 200,
        duration: 100,
      });

      expect(slide.getBoxOffset(0)).toBe(0);
      expect(slide.getBoxOffset(1)).toBe(300);
      expect(slide.getBoxOffset(2)).toBe(600);
    });

    it('returns correct box offset // widths is an array', function() {
      var slide = new Slide({
        id: 'news',
        count: 3,
        widths: [400, 150, 100],
        height: 200,
        duration: 100,
      });

      expect(slide.getBoxOffset(0)).toBe(0);
      expect(slide.getBoxOffset(1)).toBe(400);
      expect(slide.getBoxOffset(2)).toBe(550);
    });
  });

  describe('#getHtml', function() {

    it('returns correct html string', function() {
      var slide = new Slide({
        id: 'news',
        count: 3,
        widths: 200,
        height: 200,
        duration: 100,
      });
      var html = slide.getHtml(); 
      var expectedHtml = '' + 
        '<div id="news">' +
        '<div class="boxes">' +
        '<div class="box">1</div>' +
        '<div class="box">2</div>' +
        '<div class="box">3</div>' +
        '</div>' +
        '</div>';

      expect(html).toBe(expectedHtml);
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
