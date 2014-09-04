# slide.js

This is the library itself. Quick example:

```js
// STEP 1: Create an instance of Slide
var slide = new Slide({
  id:       "news",   //ID
  count:        10,   //number of boxes
  widths:      200,   //width of each box
  height:      200,   //height of each box
  duration:    100,   //sliding speed, lower number = faster
});                   

// STEP 2: Get the HTML and CSS
var html = slide.getHtml();
var css  = slide.getCss();
```

All you need from now is to paste the supplied **HTML** and **CSS** wherever you need. Lastly, add content into boxes.
