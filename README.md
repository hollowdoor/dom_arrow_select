dom-arrow-select
========

Install
----

`npm install --save dom-arrow-select`

Usage
---

```javascript
import arrowSelect from 'dom-arrow-select';

arrowSelect({
    selectID: 'selected'
}).focus(document.querySelector('#parent-id'));
```

With Defaults
---------

```javascript
import arrowSelect from 'dom-arrow-select';

const as = arrowSelect({
    //Step options for dom-step
    step: {},
    //Selection class to keep track of selected elements
    selectID: 'dom-arrow-select-selected',
    //range, and wrap are instance wide options for dom-step
    //options.range, and options.wrap work for all directions
    //without their own options.
    range: 1,
    wrap: 5,
    //When an arrow key is pressed selected() is called
    selected(next, prev, edge){
        //prev is the previous element selected by arrowSelect
        this.unSelect(prev);
        //next is the element in the
        //direction of the arrow key input
        this.select(next);
        //edge is 'first' if next is the first element
        //edge is 'last' if next is the last element
        //edge is null otherwise
    }
}).focus(document.querySelector('#parent-id'));
```

### options.step

[dom-step](https://github.com/hollowdoor/dom_step) is an internal dependency. `options.step` should be the options you would like to pass to each kind of step.

```javascript
import arrowSelect from 'dom-arrow-select';

const as = arrowSelect({
    step: {
        down: {
            wrap: 5,
            range: 3
        },
        up: {
            wrap: 5,
            range: 3
        },
        right: {
            wrap: 5,
            range: 3
        },
        left: {
            wrap: 5,
            range: 3
        },
    }
}).focus('#parent-id');
```

API
---

See [dom-get-element](https://github.com/hollowdoor/dom_get_element) to see what you can pass to `as.focus()`, `as.select()`, and `as.unSelect()`.

### as.focus(element)

Set `element` as the current parent. It's children will be selectable. `element` must be a valid value for [dom-get-element](https://github.com/hollowdoor/dom_get_element).

All methods return `this` for chaining.

### as.select(element)

Select the given child element. Passing null makes `as.select()` do nothing.

### as.unSelect(element)

De-select the given child element. Passing null makes `as.unSelect()` do nothing.

### as.selectAll()

Select all elements.

### as.unSelectAll()

De-select any selected elements.

### as.destroy()

Use `as.destroy()` to clean up event listeners, or other values in memory when you discard an instance of `dom-arrow-select`.

### as.step

`as.step` is a property containing the `options.step` options object.

### as.current

`as.current` is the current focused parent element.

### as.selectID

This is the CSS class name used to identify selected children elements.

### as.range, as.wrap

`as.range`, and `as.wrap` are the instance wide properties used as defaults for [dom-step](https://github.com/hollowdoor/dom_step) instead of the `as.step` properties.

`as.step` options take priority over `as.range`, and `as.wrap`.

About
---

Navigate, or select an element's child elements using arrow keys etc..
