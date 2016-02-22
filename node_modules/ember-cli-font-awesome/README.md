# ember-cli-font-awesome
[![npm version](https://badge.fury.io/js/ember-cli-font-awesome.svg)](http://badge.fury.io/js/ember-cli-font-awesome)
[![Build Status](https://travis-ci.org/martndemus/ember-cli-font-awesome.svg?branch=master)](https://travis-ci.org/martndemus/ember-cli-font-awesome)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-font-awesome.svg)](http://emberobserver.com/addons/ember-cli-font-awesome)

An [ember-cli](http://www.ember-cli.com) addon for using
[Font Awesome](http://fortawesome.github.io/Font-Awesome/) icons in Ember
applications.

__WARNING__: _Please verify that you are reading the README corresponding with
the version of `ember-cli-font-awesome` you are using._

## Install

In your application's directory:
```bash
$ ember install ember-cli-font-awesome
```

If you have manually installed or updated the addon via NPM then you should also
run:
```bash
$ ember generate ember-cli-font-awesome
```

### Ember Compatibility

Version `>= 1.0.0` of this addon is compatible with Ember `>= 1.11.X` and
requires Ember CLI `>= 1.13.X`.
Version `>= 0.1.0 < 1.0.0` of this addon is compatible with Ember `>= 1.13.X`
and requires Ember CLI `>= 1.13.X`

If you need compatibility with Ember `< 1.11.X` then you should try version
`0.0.9`

### Customize with sass/scss

You can opt-in to the scss version of font-awesome. You can do this by adding
the following configuration in `ember-cli-build.js`:

```js
var app = new EmberApp({
  emberCliFontAwesome: {
    useScss: true
  }
});
```

Then in your `app.scss`:

```scss
@import "bower_components/font-awesome/scss/font-awesome";
```

## Basic usage

In your Handlebars templates:

```hbs
{{fa-icon "camera"}}
```

__NOTE:__ With Ember versions `1.11.X` and `1.12.X` you must specify the the
icon as a hash param, as these versions do not support `positionalParam`.

```hbs
{{fa-icon icon="camera"}}
```

This will render:
```html
<i class="fa fa-camera"></i>
```

If you prefer, you can use the `fa-` prefix in the icon name.

```hbs
{{fa-icon "fa-camera"}}
{{fa-icon "camera"}}
```

[Complete list of Font Awesome icons](http://fortawesome.github.io/Font-Awesome/icons/)

## Options

The [Font Awesome examples](http://fortawesome.github.io/Font-Awesome/examples/)
illustrate the various options and their effects. It should be obvious how these
options map to their `fa-icon` counterparts.

### Different icon sizes

```hbs
{{fa-icon "star" size="lg"}}
{{fa-icon "star" size=2}}
{{fa-icon "star" size=3}}
{{fa-icon "star" size=4}}
{{fa-icon "star" size=5}}
```

### Rotate

```hbs
{{fa-icon "camera" rotate=90}}
{{fa-icon "camera" rotate=180}}
{{fa-icon "camera" rotate=270}}
```

### Flip

```hbs
{{fa-icon "bicycle" flip="horizontal"}}
{{fa-icon "car" flip="vertical"}}
```

### Spin

```hbs
{{fa-icon "refresh" spin=true}}
```

### Pulse

```hbs
{{fa-icon "spinner" pulse=true}}
```

### Inverse

```hbs
{{fa-icon "circle" inverse=true}}
```

### List icons

```hbs
{{fa-icon "star" listItem=true}}
```

In combination with the `{{fa-list}}` and `{{fa-list-icon}}` components:

```hbs
{{#fa-list}}
  <li>{{fa-list-icon "star"}}Item 1</li>
  <li>{{fa-list-icon "star"}}Item 2</li>
{{/fa-list}}
```

### Fixed width icons

```hbs
<div class="list-group">
  <a class="list-group-item" href="#">
    {{fa-icon "home" fixedWidth=true}} Home
  </a>
  <a class="list-group-item" href="#">
    {{fa-icon "book" fixedWidth=true}} Library
  </a>
</div>
```

### Bordered & pulled icons

```hbs
<p>
{{fa-icon "quote-left" pull="left" border=true}}
...tomorrow we will run faster, stretch out our arms farther...
And then one fine morning— So we beat on, boats against the
current, borne back ceaselessly into the past.
</p>
```

### Stacked icons

```hbs
{{#fa-stack size="lg"}}
  {{fa-icon "fa-square-o" stack=2}}
  {{fa-icon "fa-twitter" stack=1}}
{{/fa-stack}}
```


### aria-hidden attribute

To better support accessibility (i.e. screen readers), the helper now generates an `aria-hidden` attribute by default:

```hbs
{{fa-icon "star"}}
{{!-- results in: --}}
<i class="fa fa-star" aria-hidden="true"></i>
```

To remove the `aria-hidden` attribute:

```hbs
{{fa-icon "star" ariaHidden=false}}
{{!-- results in: --}}
<i class="fa fa-star"></i>
```

### Actions

You can respond to actions on the icon by passing on action handlers:

```hbs
{{fa-icon "star" click=(action "myClickHandler")}}
```

### Tag name

Use `tagName` to control the generated markup:

```hbs
{{fa-icon "star" tagName="span"}}
{{!-- results in: --}}
<span class="fa fa-star"></span>
```

### Custom class names

```hbs
{{fa-icon "bicycle" class="my-custom-class"}}
{{!-- results in: --}}
<i class="fa fa-bicycle my-custom-class"></i>
```

### Title attribute

```hbs
{{fa-icon "edit" title="Edit the item"}}
{{!-- results in: --}}
<i class="fa fa-edit" title="Edit the item"></i>
```

## License

[Public Domain](UNLICENSE)
