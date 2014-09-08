# slide.js

This is the library itself. Quick example:

Define `HTML` that follows this structure:

```html
<div id="my-news">
  <div class="slideboxes">
    <div class="slidebox"><!-- put your content here --></div>
    <div class="slidebox"><!-- put your content here --></div>
    <div class="slidebox"><!-- put your content here --></div>
    <div class="slidebox"><!-- put your content here --></div>
    <div class="slidebox"><!-- put your content here --></div>
  </div>
</div>
```

Write little `Javacript` of your choice:

```js
var slide = new Slide({
  id:       "my-news",  // ID
  count:            5,  // number of boxes
  widths:         200,  // width of each box
  width:          500,  // width of visible area
  height:         200,  // height of each box
  duration:       100,  // sliding speed, lower number = faster
});                   

slide.run();  // apply your settings and slide your content!
```

That's it!

We have successfully defined 5 boxes, each 200 pixels wide and 200 pixels high. They are sliding inside 500 pixels wide content with sliding speed set to 100.

You have mastered basics of `slide.js`!
