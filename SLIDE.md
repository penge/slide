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

Write little `Javascript` of your choice:

```js
var slide = new Slide({
  id:       "my-news",  // ID
  count:            5,  // number of boxes
  widths:         200,  // width of each box (can be Array)
  width:          500,  // width of visible area (optional)
  height:         200,  // height of each box
  duration:       100,  // sliding speed, lower number = faster
});

slide.run();  // apply your settings and slide your content!
```

That's it!

We have successfully defined 5 boxes, each 200 pixels wide and 200 pixels high. They are sliding inside 500 pixels wide content with sliding speed set to 100.

Need to define different widths for the boxes? No problem!

Just change the `widths` from `200` to an array, for example, `[100, 200, 500, 80, 80]`.

You have mastered basics of `slide.js`!

Read more to know more!

## Methods overview

```js
// Creating a new slide
var slide = new Slide(settings);

// Static methods
Slide.getExampleSettings();
Slide.areSettingsValid(settings[,aggressive]);

// Getting and setting the settings
slide.getSettings();
slide.setSettings(settings[,aggressive]);

// Getters
slide.getId();
slide.getCount();
slide.getWidths();
slide.getWidth();
slide.getHeight();
slide.getDuration();

// Setters
slide.setId(value);
slide.setCount(value);
slide.setWidths(value);
slide.setWidth(value);
slide.setHeight(value);
slide.setDuration(value);

// Widths manipulation
slide.setWidthsToArray();
slide.isWidthsArray();

// Additional getters
slide.getTotalWidth();
slide.getBoxWidth(boxIndex);
slide.getBoxWidths();
slide.getBoxWidthsByLargest();
slide.getLargestBoxWidth();
slide.getMaximumVisibleWidth();
slide.getVisibleWidth();
slide.getBoxOffset(boxIndex);
slide.getBoxDelay(boxIndex);
slide.getBoxDelays();
slide.getCss();

// Running the slide
slide.run();

// Comparing the slides
slide.equals(other);
```

## Slide(settings)

Constructor for building new slide instances.

Example:

```js
var slide = new Slide({
  id:       "my-news",  // ID
  count:            5,  // number of boxes
  widths:         200,  // width of each box (can be Array)
  width:          500,  // width of visible area (optional)
  height:         200,  // height of each box
  duration:       100,  // sliding speed, lower number = faster
});
```

All attributes, except the `width`, are required.

If any of attributes is wrong or missing, an `Error` is thrown. Example:

```js
var slide = new Slide({
  id: "my-news",
  count: 5,
});
// Error: Wrong or missing widths!
```

Remember to define the `HTML` that must follow this structure:

```html
<div id="my-news">
  <div class="slideboxes">
    <div class="slidebox"><!-- 1 --></div>
    <div class="slidebox"><!-- 2 --></div>
    <div class="slidebox"><!-- 3 --></div>
    <div class="slidebox"><!-- 4 --></div>
    <div class="slidebox"><!-- 5 --></div>
  </div>
</div>
```

The `slideboxes` and `slidebox` classes are required.

The number of `slidebox` elements must be equal to the `count` attribute.

#### settings

Type: `Object`

Settings contains all the initialization keys with their values. All keys, except the `width`, are required.

There are some restrictions about allowed values. In short. All number values must be positive integers and `id` must be valid and meaningful HTML identifier. You can read more about this under the setters section.

##### settings.id

Type: `String`

ID of our HTML element that encapsulates the `slideboxes` with number of `slidebox` childs.

##### settings.count

Type: `Number`

Defines number of `slidebox` elements that we are about to slide.

##### settings.widths

Type: `Number` or  `Array`

Sets common width or individual widths for our boxes.

##### settings.width

Type: `Number`

Sets width of visible area, within the boxes are sliding.

This is the only optional attribute. If omitted, the width of visible area will be set automatically to maximum possible value.

##### settings.height

Type: `Number`

Sets height of all boxes that also determines the height of visible area.

##### settings.duration

Type: `Number`

Designates the speed of sliding, lower number = faster. 

## Slide.getExampleSettings()

Returns: `Object`

Returns an example of valid settings, that may be helpful for fast initialization or testing purposes.

```js
var exampleSettings = Slide.getExampleSettings();
var slide = new Slide(exampleSettings);
```

## Slide.areSettingsValid(settings[,aggressive])

Returns: `Boolean` or `Error`

Allows to check if settings are valid or not.

#### settings

Type: `Object`

Settings we would like to check.

#### aggressive

Type: `Boolean` Default: `false`

Optional. If true, `Error` will be thrown for wrong/missing attributes.

## getSettings()

Returns: `Object`

Returns the settings object.

## setSettings(settings[,aggressive])

Returns: `Boolean` or `Error`

Used to set new and complete settings or just update some of the attributes.

Example:

```js
slide.setSettings({
  width: 800,
  height: 400,
});
```

#### settings

Type: `Object`

Settings we would like to set.

#### aggressive

Type: `Boolean` Default: `false`

Optional. If true, `Error` will be thrown for wrong/missing attributes.

## getId()

Returns: `String`

Returns current `id` value.

## getCount()

Returns: `Number`

Returns current `count` value.

## getWidths()

Returns: `Number` or `Array`

Returns current `widths` value.

## getWidth()

Returns: `Number`

Returns current `width` value.

## getHeight()

Returns: `Number`

Returns current `height` value.

## getDuration()

Returns: `Number`

Returns current `duration` value.

## setId(value)

Returns: `Boolean`

Sets new `id` value.

Value is set only if it's correct. If so, `true` is returned. Otherwise, value remains unchanged and `false` is returned.

The only allowed values are at least two characters long strings, composed of `a-z` with optional no trailing `-`.

```js
slide.setId('my-images');  // TRUE
slide.setId(7);            // FALSE (non-string value)
slide.setId('-ups');       // FALSE (trailing -)
```

## setCount(value)

Returns: `Boolean`

Sets new `count` value.

The only allowed values are positive integer numbers with minimum value `2`.

```js
slide.setCount(10);  // TRUE
slide.setCount(-3);  // FALSE (negative value)
slide.setCount(1);   // FALSE (below minimum)
```

## setWidths(value)

Returns: `Boolean`

Sets new `widths` value.

The only allowed values are positive integer numbers or an array with length equal to the `count` attribute.

```js
// in all examples, count is set to 3
slide.setWidths(200);                   // TRUE
slide.setWidths([200, 500, 300]);       // TRUE
slide.setWidths([200, -50, 300]);       // FALSE (negative value)
slide.setWidths([200, 500, 300, 200]);  // FALSE (count exceeded)
```

## setWidth(value)

Returns: `Boolean`

Sets new `width` value.

The only allowed values are positive integer numbers.

## setHeight(value)

Returns: `Boolean`

Sets new `height` value.

The only allowed values are positive integer numbers.

## setDuration(value)

Returns: `Boolean`

Sets new `duration` value.

The only allowed values are positive integer numbers.

## setWidthsToArray()

Returns: `Boolean`

Transforms the `widths` from number to array.

Returns `false` when `widths` is already an array.

```js
slide.getCount();          // 4
slide.getWidths();         // 200

slide.setWidthsToArray();  // TRUE
slide.getWidths();         // [200, 200, 200, 200]

slide.setWidthsToArray();  // FALSE
```

## isWidthsArray()

Returns: `Boolean`

Returns true if `widths` is in its array form.

## getTotalWidth()

Returns: `Number`

Returns total width of boxes.

```js
// count is 4, widths is 200
slide.getTotalWidth();  // 800

// count is 4, widths is [400, 400, 100, 100]
slide.getTotalWidth();  // 1000
```

## getBoxWidth(boxIndex)

Returns: `Number`

Returns width of the box at specified index.

```js
// count is 4, widths is 200
slide.getBoxWidth(2);  // 200

// count is 4, widths is [400, 400, 100, 100]
slide.getBoxWidth(2);  // 100
```

#### boxIndex

Type: `Number`

Zero-based index of box.

## getBoxWidths()

Returns: `Array`

Returns all box widths as an array.

If `widths` is an array, using `getWidths()` would return the same result.

## getBoxWidthsByLargest()

Returns: `Array`

Returns all box widths as an array, with descending order.

## getLargestBoxWidth()

Returns: `Number`

Returns largest box width.

## getMaximumVisibleWidth()

Returns: `Number`

Returns maximum visible width that can be set to the visible area.

## getVisibleWidth()

Returns: `Number`

Returns actual visible width that gets set to the visible area.

The `width` attribute takes precedence only if it's smaller than the maximum visible width.

## getBoxOffset(boxIndex)

Returns: `Number`

Returns offset of the box at specified index.

#### boxIndex

Type: `Number`

Zero-based index of box.

## getBoxDelay(boxIndex)

Returns: `Number`

Returns delay of the box at specified index.

#### boxIndex

Type: `Number`

Zero-based index of box.

## getBoxDelays()

Returns: `Array`

Returns box delays as an array.

## getCss()

Returns: `String`

Returns css that gets set for achieving the slide result.

## run()

The main method that applies our settings and starts the slide.

```js
slide.run();
```

## equals(other)

Returns: `Boolean`

Compares two slide instances and returns `true` if they are the same.

Objects can be evaluated as the same even when the `widths` is number and array on the other's side, but only if the array's form consists of the same numbers as the number `widths` is.

#### other

Type: `Slide`

Other slide instance that is going to be compared.
