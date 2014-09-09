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
