'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var events = _interopDefault(require('dom-eve'));
var domStep = _interopDefault(require('dom-step'));
var matches = _interopDefault(require('matches-selector'));
var arrayFrom = _interopDefault(require('array-from'));
var getCorner = _interopDefault(require('dom-get-corner'));
var getElement = _interopDefault(require('dom-get-element'));
var domKeysMixin = require('dom-keys-mixin');
var moreEvents = require('more-events');
var rawObject = _interopDefault(require('raw-object'));

var keySet = rawObject({
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down'
});

function getKey(keyCode){
    return keySet[keyCode] || null;
}

var DOMArrowSelect = (function (Emitter$$1) {
    function DOMArrowSelect(ref){
        var this$1 = this;
        if ( ref === void 0 ) ref = {};
        var selectID = ref.selectID; if ( selectID === void 0 ) selectID = 'dom-arrow-select-selected';
        var selected = ref.selected; if ( selected === void 0 ) selected = function(next, prev){
            this.unSelect(prev);
            this.select(next);
        };
        var outside = ref.outside; if ( outside === void 0 ) outside = function(){};
        var step = ref.step; if ( step === void 0 ) step = function(){};
        var classList = ref.classList; if ( classList === void 0 ) classList = function(element){
            return element.classList;
        };

        Emitter$$1.call(this);
        this.element = null;
        this.current = null;
        this._selected = selected;
        this._outside = outside;
        this._classList = classList;
        this._step = function(dir){
            return step.call(this, dir) || {};
        };

        Object.defineProperty(this, 'selectID', {
            value: selectID,
            enumerable: true
        });

        domKeysMixin.mixinKeys(this);

        var tracker = this.tracker = events.track();

        events(document, tracker).on('keydown', function (event){

            var element = this$1.element;
            var key = getKey(event.which || event.keyCode);

            if(key && element && element.parentNode){
                this$1.step(key);
            }
        });

        events(document, tracker).on('mousedown', function (event){
            if(matches(event.target, '.'+selectID)){
                this$1.emit('pointerdown', event.target);
                event.stopPropagation();
            }
        });

        events(document, tracker).on('keyup', function (event){
            if(13 !== (event.which || event.keyCode)) { return; }

            if(this$1.element.offsetHeight){
                var elements$1 = this$1.element.querySelectorAll('.'+selectID);
                if(elements$1 && elements$1.length){
                    this$1.emit('focusenter', arrayFrom(elements$1));
                }
            }

            var elements = document.querySelectorAll('.'+selectID);
            if(elements && elements.length){
                this$1.emit('enter', arrayFrom(elements));
            }
        });

        this.destroy = function(){
            tracker.clear();
            domKeysMixin.cleanKeysMixin(this);
        };
    }

    if ( Emitter$$1 ) DOMArrowSelect.__proto__ = Emitter$$1;
    DOMArrowSelect.prototype = Object.create( Emitter$$1 && Emitter$$1.prototype );
    DOMArrowSelect.prototype.constructor = DOMArrowSelect;
    DOMArrowSelect.prototype.step = function step (key){
        var element = this.element;
        var el = this.current;
        var next = null;
        var ref = this;
        var _step = ref._step;
        var _selected = ref._selected;
        var _outside = ref._outside;
        var opts = _step.call(this, key);

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
        child = getElement(child, this.element);

        if(child){
            if(child.parentNode !== this.element){
                throw new TypeError(((child.outerHTML) + " is not a child of " + (this.element.outerHTML)));
            }
            this._classList(child).remove(this.selectID);
            if(this.current === child){
                this.current = null;
            }
        }
        return this;
    };
    DOMArrowSelect.prototype.select = function select (child){
        if(child === null) { return this; }
        if(!this.element) { return this; }
        child = getElement(child, this.element);

        if(child.parentNode !== this.element){
            throw new TypeError(((child.outerHTML) + " is not a child of " + (this.element.outerHTML)));
        }

        if(child !== this.current){
            this._classList(child).add(this.selectID);
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
    DOMArrowSelect.prototype.unSelectIndex = function unSelectIndex (index){
        if(!this.element) { return this; }
        if(index < 0){
            index = this.element.children.length + index;
        }
        this.unSelect(this.element.children[index]);
        return this;
    };

    return DOMArrowSelect;
}(moreEvents.Emitter));

function arrowSelect(element, options){
    return new DOMArrowSelect(element, options);
}

module.exports = arrowSelect;
//# sourceMappingURL=bundle.js.map
