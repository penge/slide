describe('JSlider', function() {

  describe('construction', function() {

    it('properly sets variables', function() {
      var jslider = new window.jslider({
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
      var jslider = new window.jslider();

      expect(jslider.id).toBe('news');
      expect(jslider.count).toBe(10);
      expect(jslider.width).toBe(200);
      expect(jslider.height).toBe(200);
      expect(jslider.duration).toBe(100);
    });
  });

  describe('#getTotalWidth', function() {

    it ('returns correct total width', function() {
      var jslider = new window.jslider({
        count: 5,
        width: 300,
      });
      var width = jslider.getTotalWidth();
      var expectedWidth = 1500;

      expect(width).toBe(expectedWidth);
    });
  });
});
