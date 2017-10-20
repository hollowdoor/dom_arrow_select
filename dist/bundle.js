'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var events = _interopDefault(require('dom-eve'));
var domStep = _interopDefault(require('dom-step'));
var arrayFrom = _interopDefault(require('array-from'));
var getCorner = _interopDefault(require('dom-get-corner'));
var getElement = _interopDefault(require('dom-get-element'));

var keySet = {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down'
};

function getKey(keyCode){
    return keySet[keyCode] || null;
}

var DOMArrowSelect = function DOMArrowSelect(ref){
    var this$1 = this;
    if ( ref === void 0 ) ref = {};
    var selectID = ref.selectID; if ( selectID === void 0 ) selectID = 'dom-arrow-select-selected';
    var selected = ref.selected; if ( selected === void 0 ) selected = function(next, prev){
        this.unSelect(prev);
        this.select(next);
    };
    var outside = ref.outside; if ( outside === void 0 ) outside = function(){};
    var step = ref.step; if ( step === void 0 ) step = function(){};


    this.element = null;
    this.current = null;
    this._selected = selected;
    this._outside = outside;
    this._stepOpts = function(dir){
        return step.call(this, dir) || {};
    };

    Object.defineProperty(this, 'selectID', {
        value: selectID,
        enumerable: true
    });

    /*const getStepOpts = dir=>{
        return step.call(this, dir) || {};
    };*/

    var tracker = this.tracker = events.track();

    events(document, tracker).on('keyup', function (event){
        var element = this$1.element;
        var key = getKey(event.which || event.keyCode);

        if(key && element && element.parentNode){
            this$1.step(key);
        }
    });

    this.destroy = function(){
        tracker.clear();
    };
};
DOMArrowSelect.prototype.step = function step (key){
    var element = this.element;
    var el = this.current;
    var next = null;
    var ref = this;
        var _stepOpts = ref._stepOpts;
        var _selected = ref._selected;
        var _outside = ref._outside;
    var opts = _stepOpts.call(this, key);

    if(!this.current){
        next = getCorner(element, key, {
            reverse:true,
            xrange: opts.wrap,
            yrange: opts.wrap
        });
    }else{
        next = domStep(this.current, key, opts);
    }

    if(next){
        _selected.call(
            this,
            next,
            this.current
        );
    }else{
        _outside.call(
            this,
            this.current,
            key
        );
    }
    return this;
};
DOMArrowSelect.prototype.focus = function focus (element){
    if(!element){
        this.element = element;
        return this;
    }
    this.element = getElement(element);
    return this;
};
DOMArrowSelect.prototype.focused = function focused (element){
    if(!element) { return false; }
    var el = getElement(element);
    return this.element === el;
};
DOMArrowSelect.prototype.swap = function swap (element, direction){
    if(typeof direction !== 'string'){
        return this.unSelectAll().focus(element);
    }
    return this.unSelectAll().focus(element).step(direction);
};
DOMArrowSelect.prototype.unSelect = function unSelect (child){
    if(child === null) { return this; }
    if(!this.element) { return this; }
    child = getElement(child);

    if(child){
        if(child.parentNode !== this.element){
            throw new TypeError(((child.outerHTML) + " is not a child of " + (this.element.outerHTML)));
        }
        child.classList.remove(this.selectID);
        if(this.current === child){
            this.current = null;
        }
    }
    return this;
};
DOMArrowSelect.prototype.select = function select (child){
    if(child === null) { return this; }
    if(!this.element) { return this; }
    child = getElement(child);

    if(child.parentNode !== this.element){
        throw new TypeError(((child.outerHTML) + " is not a child of " + (this.element.outerHTML)));
    }

    if(child !== this.current){
        child.classList.add(this.selectID);
        this.current = child;
    }
    return this;
};
DOMArrowSelect.prototype.unSelectAll = function unSelectAll (){
        var this$1 = this;


    if(!this.element) { return this; }

    arrayFrom(this.element.querySelectorAll('.'+this.selectID))
    .forEach(function (child){
        this$1.unSelect(child);
    });
    this.current = null;
    return this;
};
DOMArrowSelect.prototype.selectAll = function selectAll (){
        var this$1 = this;

    if(!this.element) { return this; }
    var list = this.element.children;
    for(var i=0; i<list.length; i++){
        this$1.select(list[i]);
    }
    this.current = list[list.length - 1];
    return this;
};
DOMArrowSelect.prototype.selectIndex = function selectIndex (index){
    if(!this.element) { return this; }
    if(index < 0){
        index = this.element.children.length + index;
    }
    this.select(this.element.children[index]);
    return this;
};
DOMArrowSelect.prototype.deselectIndex = function deselectIndex (index){
    if(!this.element) { return this; }
    if(index < 0){
        index = this.element.children.length + index;
    }
    this.unSelect(this.element.children[index]);
    return this;
};

function arrowSelect(element, options){
    return new DOMArrowSelect(element, options);
}

module.exports = arrowSelect;
//# sourceMappingURL=bundle.js.map
