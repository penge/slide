UI.init(new Inputs({
  $id:       $('#id'),
  $count:    $('#count'),
  $widths:   $('#widths'),
  $width:    $('#width'),
  $height:   $('#height'),
  $duration: $('#duration'),
})).setSlide(new Slide({
  id: 'news',
  count: 10,
  widths: 200,
  height: 200,
  duration: 100,
}));
