UI.init(new Inputs({
  $id:       $('#id'),
  $count:    $('#count'),
  $widths:   $('#widths'),
  $width:    $('#width'),
  $height:   $('#height'),
  $duration: $('#duration'),
})).setSlide(new Slide({
  id: 'news',
  count: 6,
  widths: 400,
  height: 250,
  duration: 100,
}));
