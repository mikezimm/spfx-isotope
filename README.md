## spfx-isotope

This is an attempt to duplicate this functionality in SPFx webpart.

Reference this code-pen example:  https://codepen.io/desandro/pen/lzCqe
I also changed the code-pen syntax to SCSS and Typescript

### Building the code

```bash
yo @microsoft/sharepoint
npm install jquery
npm install @types/jquery --save-dev
npm install isotope-layout --save
updated config.json per notes below

changed dash-css--classes to dashCssClasses per notes below
added .ts import statements per notes below
gulp build
modfied .ts html:  to make camelCase classes
modfied .ts html:  reduced tabs and tiles to just 2 to test functionality.
modfied .ts typescript:  reduced tabs and tiles to just 2 to test functionality.
tested all these html/scss/typescript changes in code pen to insure it worked... and it did.

gulp build failed:   error on first new line of code
var $grid = $('.grid').isotope({
upon removing all js/ts code, gulp serve ran

error when adding webpart to workbench:
Failed to load path dependancy "isotope" from component ... due to another dependency that failed to load.
```

### config.json updates

  "externals": {
    "jquery": {
      "path": "https://code.jquery.com/jquery-3.4.1.min.js",
      "globalName": "jQuery"
    },
    "isotope": {
      "path": "https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js",
      "globalName": "jQuery",
      "globalDependencies": [
        "jquery"
      ]
    }
  },

### .ts import statements

    /* MZ CHANGES---- added imports for jQuery and isotope ---- */
    import * as $ from 'jquery';
    require('isotope');

### .scss updates - changed to camelCase

    /* MZ CHANGES---- replace button-group with buttonGroup ---- */
    /* MZ CHANGES---- replace element-item with elementItem ---- */
    /* MZ CHANGES---- replace alkaline-earth with alkalineEarth ---- */
    /* MZ CHANGES---- replace post-transition with postTransition ---- */
    /* MZ CHANGES---- replace noble-gas with nobleGas ---- */
    /* MZ CHANGES---- replace is-checked with isChecked ---- */

### Simplified html just to keep it simple.... only 2 buttons and 2 tiles.
Pressing each tab should change the order
NOTE:  replaced button-group, post-transition, noble-gas nonmetal with camelCase

```html
<h1>Isotope - sorting</h1>

<div class="button-group sort-by-button-group">
  <button class="button is-checked" data-sort-value="original-order">original order</button>
  <button class="button" data-sort-value="name">name</button>
</div>

<div class="grid">
  <div class="element-item post-transition metal " data-category="post-transition">
    <h3 class="name">Bismuth</h3>
    <p class="symbol">Bi</p>
    <p class="number">83</p>
    <p class="weight">208.980</p>
  </div>
  <div class="element-item noble-gas nonmetal " data-category="noble-gas">
    <h3 class="name">Argon</h3>
    <p class="symbol">Ar</p>
    <p class="number">18</p>
    <p class="weight">39.948</p>
  </div>
</div>
```


This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
