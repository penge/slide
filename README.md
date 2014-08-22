# JSlider

A small library that is used to create custom sliding content by providing us with necessary **HTML** and **CSS** that would take long time to write manually.

## Sliding content

Sliding content can be anything — news, images, icons, etc.

You can think of sliding content as several boxes, where:
- minimum number of boxes is 2,
- each box has its width and height,
- boxes are placed horizontally, one next to each other,
- total width of boxes is usually larger that the page width or parent container width,
- boxes are sliding from left to right in some defined speed.

Current version of **JSlider** supports equally large boxes only.

## Usage

You can use **JSlider** manually or by opening `index.html` that utilizes the library with nice live preview.

To use **JSlider** manually, you will need the `./scripts/jslider.js` file.

## jslider.js

This is the library itself. The manual usage is as follows:

```js
// STEP 1: Create an instance of JSlider
// By omitting the initialization, we would get the same defaults
// By omitting just some initialization key, we would get the same default for that key
var slider = new JSlider({
  id:       "news",   //ID
  count:        10,   //number of boxes
  width:       200,   //width of each box
  height:      200,   //height of each box
  duration:    100,   //sliding speed, lower number = faster
});                   

// STEP 2: Get the HTML and CSS
var html = slider.getHtml();
var css  = slider.getCss();
```

All you need from now is to paste the supplied **HTML** and **CSS** wherever you need. Lastly, add content into boxes.
