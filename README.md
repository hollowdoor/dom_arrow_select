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

All options are optional. :)

```javascript
import arrowSelect from 'dom-arrow-select';

const as = arrowSelect({
    //Step options for dom-step
    step(side){
        //returns undefined as the default
    },
    //Selection class to keep track of selected elements
    selectID: 'dom-arrow-select-selected',
    //When an arrow key is pressed selected() is called
    selected(next, prev){
        //prev is the previous element selected by arrowSelect
        this.unSelect(prev);
        //next is the element in the
        //direction of the arrow key input
        this.select(next);
    },
    outside(current, side){
        //This is called when the next element is unreachable
        //either because of some funky step math,
        //or because the current direction leads
        //outside the focused parent element

        //If options.step() returns with a wrap option
        //outside() might not be called
    }
}).focus(document.querySelector('#parent-id'));
```

### options.step()

[dom-step](https://github.com/hollowdoor/dom_step) is an internal dependency. `options.step()` should return options you would like to pass to each kind of step. See [dom-step](https://github.com/hollowdoor/dom_step) to find out what you can use this for.

```javascript
import arrowSelect from 'dom-arrow-select';
//Here the directions are all the same
//You can modify these based on the situation
const directions = {
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
    }
};

const as = arrowSelect({
    step(side){
        return directions[side];
    },
    outside(current, side){
        //This probably won't get called
        //because of directions[side].wrap
    }
}).focus('#parent-id');
```

API
---

See [dom-get-element](https://github.com/hollowdoor/dom_get_element) to see what you can pass to `as.focus()`, `as.select()`, `as.unSelect()`, and `as.swap()`.

All methods return `this` for chaining.

### as.focus(element)

Set `element` as the current parent. It's children will be selectable. `element` must be a valid value for [dom-get-element](https://github.com/hollowdoor/dom_get_element).

Pass a falsey value to `as.focus()` to temporarily turn off selections/de-selections made by `dom-arrow-select`.

### as.focused(element)

`as.focused()` returns false if `element` is not the currently focused element, and returns true otherwise.

### as.step(direction)

The direction parameter of `as.step()` can be one of these string values:

* up
* down
* left
* right

Calling `as.step(direction)` is a manual way of selecting an element in the given direction. Usually you will want to allow the arrow keys to do the selection.

### as.select(element)

Select the given child element. Passing null makes `as.select()` do nothing.

### as.unSelect(element)

De-select the given child element. Passing null makes `as.unSelect()` do nothing.

### as.selectAll()

Select all elements.

### as.unSelectAll()

De-select any selected elements.

### as.selectIndex(index)

Select a child element by integer index. Negative numbers will go backwards from the length of the parent's children.

### as.unSelectIndex(index)

`as.unSelectIndex()` works like `as.selectIndex()` except deselects by index.

### as.swap(element, direction)

`as.swap()` is a convenience method that does `as.unSelectAll()`, `as.focus(element)`, and `as.step(direction)` in this order.

The direction argument is optional. If you don't set the `direction` argument then `as.swap()` does `as.unSelectAll()`, and `as.focus(element)` only.

### as.destroy()

Use `as.destroy()` to clean up event listeners, or other values in memory when you discard an instance of `dom-arrow-select`.

### as.current

`as.current` is the current selected child element.

### as.element

`as.element` is the current focused parent element.

### as.selectID

This is the CSS class name used to identify selected children elements. `as.selectID` is read only.

### as.ctrl, as.shift, as.alt

These are true if their keys are being held down; false if their keys are not being held.

**WARNING!:** Some infinite recursion is possible when combining these methods, and options:

* options.selected()
* options.outside()
* options.step()
* as.select()
* as.step()
* as.unSelect()
* as.swap()

Don't worry too much. It's just good to be aware of this.

About
---

Navigate, or select an element's child elements using arrow keys etc..
