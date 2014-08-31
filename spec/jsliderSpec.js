describe('JSlider', function() {

  describe('initialization', function() {

    it('properly sets variables // widths is integer', function() {
      var jslider = new JSlider({
        id: 'my-news',
        count: 4,
        widths: 200,
        width: 600,
        height: 100,
        duration: 300,
      });
      
      expect(jslider.getId()).toBe('my-news');
      expect(jslider.getCount()).toBe(4);
      expect(jslider.getWidths()).toBe(200);
      expect(jslider.getWidth()).toBe(600);
      expect(jslider.getHeight()).toBe(100);
      expect(jslider.getDuration()).toBe(300);
      expect(jslider.getTotalWidth()).toBe(800); // 200 * 4
    });

    it('properly sets variables // widths is an array', function() {
      jslider = new JSlider({
        id: 'my-news',
        count: 4,
        widths: [200, 100, 600, 100],
        width: 700,
        height: 200,
        duration: 400,
      });

      expect(jslider.getId()).toBe('my-news');
      expect(jslider.getCount()).toBe(4);
      expect(jslider.getWidths().length).toBe(4);
      expect(jslider.getWidths()[0]).toBe(200);
      expect(jslider.getWidths()[1]).toBe(100);
      expect(jslider.getWidths()[2]).toBe(600);
      expect(jslider.getWidths()[3]).toBe(100);
      expect(jslider.getHeight()).toBe(200);
      expect(jslider.getDuration()).toBe(400);
      expect(jslider.getWidth()).toBe(700);
      expect(jslider.getTotalWidth()).toBe(1000); // 200 + 100 + 600 + 100
    });
    
    var expectDefaults = function(jslider) {
      expect(jslider.getId()).toBe('news');
      expect(jslider.getCount()).toBe(10);
      expect(jslider.getWidths()).toBe(200);
      expect(jslider.getWidth()).toBe(null);
      expect(jslider.getHeight()).toBe(200);
      expect(jslider.getDuration()).toBe(100);
      expect(jslider.getTotalWidth()).toBe(2000);
    };

    it('properly sets defaults if settings omitted', function() {
      var jslider = new JSlider();

      expectDefaults(jslider);
    });

    it('properly sets defaults for invalid settings', function() {
      var jslider = new JSlider({
        id: '234',
        count: 15.8,
        widths: -14,
        height: 'abc',
        duration: -90, 
      });

      expectDefaults(jslider);
    });
  });

  describe('setters', function() {

    it('returns true/false for correct/incorrect values', function() {
      var jslider = new JSlider();

      expect(jslider.setId('my-id')).toBe(true);
      expect(jslider.setId(543)).toBe(false);

      expect(jslider.setCount(10)).toBe(true);
      expect(jslider.setCount(-3)).toBe(false);

      expect(jslider.setWidths(200)).toBe(true);
      expect(jslider.setWidths(200.7833)).toBe(false);

      jslider.setCount(3);
      expect(jslider.setWidths([200, 300, 300])).toBe(true);
      expect(jslider.setWidths([200])).toBe(false);
      expect(jslider.setWidths([200, 300, 300, 300])).toBe(false);
      expect(jslider.setWidths([200, 300, -300])).toBe(false);
      expect(jslider.setWidths(['a', 'b', 'c'])).toBe(false);

      expect(jslider.setWidth(1000)).toBe(true);
      expect(jslider.setWidth('1000')).toBe(false);

      expect(jslider.setHeight(200)).toBe(true);
      expect(jslider.setHeight(-200)).toBe(false);

      expect(jslider.setDuration(100)).toBe(true);
      expect(jslider.setDuration(100.2)).toBe(false);

      expect(jslider.setSettings({count: 4})).toBe(true);
      expect(jslider.setSettings({count: -4})).toBe(false);
    });
  });

  describe('#getTotalWidth', function() {

    it('returns correct total width // widths is an integer', function() {
      var jslider = new JSlider({
        count: 5,
        widths: 300,
      });

      expect(jslider.getTotalWidth()).toBe(1500);
    });

    it('returns correct total width // widths is an array', function() {
      var jslider = new JSlider({
        count: 5,
        widths: [100, 100, 100, 200, 300],
      });

      expect(jslider.getTotalWidth()).toBe(800);
    });
  });

  describe('#getBoxDelay', function() {

    it('returns correct box delay // widths is a integer', function() {
      var jslider = new JSlider({
        count: 5,
        widths: 200,
        duration: 100,
      });

      expect(jslider.getTotalWidth()).toBe(1000);
      expect(jslider.getBoxDelay(0)).toBe(0);
      expect(jslider.getBoxDelay(1)).toBe(20);
      expect(jslider.getBoxDelay(2)).toBe(40);
      expect(jslider.getBoxDelay(3)).toBe(60);
      expect(jslider.getBoxDelay(4)).toBe(80);
    });

    it('returns correct box delay // widths is an array', function() {
      var jslider = new JSlider({
        count: 5,
        widths: [100, 500, 100, 300, 100],
        duration: 100,
      });

      expect(jslider.getTotalWidth()).toBe(1100);
      expect(jslider.getBoxDelay(0)).toBe(0);
      expect(jslider.getBoxDelay(1)).toBe(9.091);
      expect(jslider.getBoxDelay(2)).toBe(54.545);
      expect(jslider.getBoxDelay(3)).toBe(63.636);
      expect(jslider.getBoxDelay(4)).toBe(90.909);
    });
  });

  describe('#getBoxWidth', function() {

    it('returns correct box width // widths is a integer', function() {
      var jslider = new JSlider({
        count: 3,
        widths: 300,
        duration: 100,
      });

      expect(jslider.getBoxWidth(0)).toBe(300);
      expect(jslider.getBoxWidth(1)).toBe(300);
      expect(jslider.getBoxWidth(2)).toBe(300);
    });

    it('returns correct box width // widths is an array', function() {
      var jslider = new JSlider({
        count: 3,
        widths: [300, 200, 75],
        duration: 100,
      });

      expect(jslider.getBoxWidth(0)).toBe(300);
      expect(jslider.getBoxWidth(1)).toBe(200);
      expect(jslider.getBoxWidth(2)).toBe(75);
    });
  });

  describe('#getBoxOffset', function() {

    it('returns correct box offset // widths is a integer', function() {
      var jslider = new JSlider({
        count: 3,
        widths: 300,
        duration: 100,
      });

      expect(jslider.getBoxOffset(0)).toBe(0);
      expect(jslider.getBoxOffset(1)).toBe(300);
      expect(jslider.getBoxOffset(2)).toBe(600);
    });

    it('returns correct box offset // widths is an array', function() {
      var jslider = new JSlider({
        count: 3,
        widths: [400, 150, 100],
        duration: 100,
      });

      expect(jslider.getBoxOffset(0)).toBe(0);
      expect(jslider.getBoxOffset(1)).toBe(400);
      expect(jslider.getBoxOffset(2)).toBe(550);
    });
  });

  describe('#getHtml', function() {

    it('returns correct html string', function() {
      var jslider = new JSlider({
        count: 3
      });
      var html = jslider.getHtml(); 
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
      var jslider = new JSlider({
        id: 'images',
        count: 3,
        widths: 500,
        height: 300,
        duration: 150,
      });
      var css = jslider.getCss();
      var expectedCss = '' +
        '#images{' +
          'overflow:hidden;' +
          'width:100%;' +
          '}' +
        '#images .boxes{' +
          'overflow:hidden;' +
          'position:relative;' +
          'width:1500px;' +
          'height:300px;' +
          'margin-left:-500px;' +
          '}' +
        '#images .boxes .box{' +
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
        '#images .boxes .box:nth-child(1){' +
          'animation-delay:-0s;' +
          '-webkit-animation-delay:-0s;' +
          '-moz-animation-delay:-0s;' +
          '}' +
        '#images .boxes .box:nth-child(2){' +
          'animation-delay:-50s;' +
          '-webkit-animation-delay:-50s;' +
          '-moz-animation-delay:-50s;' +
          '}' +
        '#images .boxes .box:nth-child(3){' +
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
      var a = new JSlider();
      var b = new JSlider();

      expect(a).toEqual(b);
    });

    it('returns false for objects with different settings', function() {
      var a = new JSlider({ count: 4 });
      var b = new JSlider({ count: 7 });

      expect(a).not.toEqual(b);
    });
  });
});
