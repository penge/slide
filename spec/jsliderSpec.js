describe('JSlider', function() {

  describe('construction', function() {

    it('properly sets variables', function() {
      var jslider = new JSlider({
        id: 'my-news',
        count: 15,
        width: 200,
        height: 100,
        duration: 300,
      });
      
      expect(jslider.id).toBe('my-news');
      expect(jslider.count).toBe(15);
      expect(jslider.width).toBe(200);
      expect(jslider.height).toBe(100);
      expect(jslider.duration).toBe(300);
    });
    
    it('properly sets defaults for variables', function() {
      var jslider = new JSlider();

      expect(jslider.id).toBe('news');
      expect(jslider.count).toBe(10);
      expect(jslider.width).toBe(200);
      expect(jslider.height).toBe(200);
      expect(jslider.duration).toBe(100);
    });
  });

  describe('#getTotalWidth', function() {

    it ('returns correct total width', function() {
      var jslider = new JSlider({
        count: 5,
        width: 300,
      });
      var width = jslider.getTotalWidth();
      var expectedWidth = 1500;

      expect(width).toBe(expectedWidth);
    });
  });

  describe('#getBoxDelay', function() {

    it('returns correct box delay', function() {
      var jslider = new JSlider({
        count: 5,
        duration: 100,
      });

      expect(jslider.getBoxDelay(0)).toBe(0);
      expect(jslider.getBoxDelay(1)).toBe(20);
      expect(jslider.getBoxDelay(2)).toBe(40);
      expect(jslider.getBoxDelay(3)).toBe(60);
      expect(jslider.getBoxDelay(4)).toBe(80);
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
        width: 500,
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
});
