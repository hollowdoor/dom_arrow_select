dom-arrow-select
========

Install
----

`npm install --save dom-arrow-select`

Usage
---

```javascript
import arrowSelect from 'dom-arrow-select';

arrowSelect(document.querySelector('#parent-id'), {
    selectID: 'selected'
});
```

With Defaults
---------

```javascript
import arrowSelect from 'dom-arrow-select';

const as = arrowSelect(document.querySelector('#parent-id'), {
    //Step options for dom-step
    step: {},
    //Selection class to keep track of selected elements
    selectID: 'dom-arrow-select-selected',
    //Global options for dom-step
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
        //edge is first if next is the first element
        //edge is last if next is the last element
        //edge is null otherwise
    }
});
```

### options.step

[dom-step](https://github.com/hollowdoor/dom_step) is an internal dependency. `options.step` should be the options you would like to pass to each kind of step.

```javascript
import arrowSelect from 'dom-arrow-select';

const as = arrowSelect(document.querySelector('#parent-id'), {
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
});
```

API
---

### as.select(element)

Select the given element.

### as.unSelect(element)

De-select the given element.

### as.selectAll()

Select all elements.

### as.unSelectAll()

De-select any selected elements.

About
---

Navigate, or select an element's child elements using arrow keys etc..
