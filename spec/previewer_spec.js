describe('Previewer', function() {

  var NL = '\n';
  var TAB = '\t';

  var slide = null;
  var previewer = null;

  var slideArray = null;
  var previewerArray = null;

  beforeEach(function() {
    slide = new Slide({
      id: 'news',
      count: 3,
      widths: 200,
      width: 400,
      height: 250,
      duration: 100,
    });

    slideArray = new Slide({
      id: 'news',
      count: 3,
      widths: [200, 300, 400],
      width: 600,
      height: 250,
      duration: 100,
    });

    previewer = new Previewer(slide);  
    previewerArray = new Previewer(slideArray);  
  });

  describe('init', function() {

    it('properly sets slide', function() {
      expect(previewer.slide.equals(slide)).toBe(true);  
      expect(previewerArray.slide.equals(slideArray)).toBe(true);  
    });
  });

  describe('#getHtml', function() {

    it('returns correct html string', function() {
      var expected = [
        '<div id="news">',
        TAB + '<div class="slideboxes">',
        TAB + TAB + '<div class="slidebox">1</div>',
        TAB + TAB + '<div class="slidebox">2</div>',
        TAB + TAB + '<div class="slidebox">3</div>',
        TAB + '</div>',
        '</div>'
      ].join(NL);

      expect(previewer.getHtml()).toEqual(expected);
    });
  });

  describe('#getJs', function() {

    it('returns correct js string', function() {
      var expected = [
        'var slide = new Slide({',
        TAB + 'id: "news",',
        TAB + 'count: 3,',
        TAB + 'widths: 200,',
        TAB + 'width: 400,',
        TAB + 'height: 250,',
        TAB + 'duration: 100,',
        '});' + NL,
        'slide.run();'
      ].join(NL);

      var expectedArray = [
        'var slide = new Slide({',
        TAB + 'id: "news",',
        TAB + 'count: 3,',
        TAB + 'widths: [200, 300, 400],',
        TAB + 'width: 600,',
        TAB + 'height: 250,',
        TAB + 'duration: 100,',
        '});' + NL,
        'slide.run();'
      ].join(NL);

      expect(previewer.getJs()).toEqual(expected);
      expect(previewerArray.getJs()).toEqual(expectedArray);
    });
  });
});
