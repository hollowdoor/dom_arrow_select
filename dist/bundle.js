'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var events = _interopDefault(require('dom-eve'));
var domStep = _interopDefault(require('dom-step'));
var arrayFrom = _interopDefault(require('array-from'));
var getCorner = _interopDefault(require('dom-get-corner'));

function stepOption(opts, options, step, self){
    opts[step] = {};
    var range = options.range;
    var wrap = options.wrap;
    Object.defineProperties(opts[step], {
        range: {
            set: function set(v){
                range = v;
            },
            get: function get(){
                return range || self.range;
            }
        },
        wrap: {
            set: function set(v){
                wrap = v;
            },
            get: function get(){
                return wrap || self.wrap;
            }
        }
    });
    return opts;
}

function createStepOptions(options, self){
    var opts = {};
    stepOption(opts, options, 'down', self);
    stepOption(opts, options, 'up', self);
    stepOption(opts, options, 'left', self);
    stepOption(opts, options, 'right', self);
    return options;
}

var keySet = {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down'
};

function getKey(keyCode){
    return keySet[keyCode] || null;
}

function isEdge(el, child){
    if(el.children[el.children.length - 1] === child){
        return 'last';
    }else if(el.children[0] === child){
        return 'first';
    }
    return null;
}

var DOMArrowSelect = function DOMArrowSelect(element, ref){
    var this$1 = this;
    if ( ref === void 0 ) ref = {};
    var step = ref.step; if ( step === void 0 ) step = {};
    var selectID = ref.selectID; if ( selectID === void 0 ) selectID = 'dom-arrow-select-selected';
    var selected = ref.selected; if ( selected === void 0 ) selected = function(next, prev){
        this.unSelect(prev);
        this.select(next);
    };
    var range = ref.range; if ( range === void 0 ) range = 1;
    var wrap = ref.wrap; if ( wrap === void 0 ) wrap = 5;


    this.range = range;
    this.wrap = wrap;
    this.element = element;
    this.current = null;
    this.selectID = selectID;

    this.step = createStepOptions(step, this);

    var tracker = this.tracker = events.track();

    events(document, tracker).on('keyup', function (event){

        var key = getKey(event.which || event.keyCode);

        if(key){
            var el = this$1.current;
            var next = null;
            if(!el){
                next = getCorner(element, key, {reverse:true});
            }else{
                next = domStep(el, key, this$1.step[key]);
            }

            if(next){
                //The parent is in the document
                if(element.parentNode){
                    selected.call(this$1, next, this$1.current, isEdge(element, next));
                }
            }
        }
    });

    this.destroy = function(){
        tracker.clear();
    };
};
DOMArrowSelect.prototype.unSelect = function unSelect (child){

    if(child){
        if(child.parentNode !== this.element){
            throw new TypeError(((child.outerHTML) + " is not a child of " + (this.element.outerHTML)));
        }
        child.classList.remove(this.selectID);
        if(this.current === child){
            this.current = null;
        }
    }
};
DOMArrowSelect.prototype.select = function select (child){
    if(child.parentNode !== this.element){
        throw new TypeError(((child.outerHTML) + " is not a child of " + (this.element.outerHTML)));
    }

    if(child !== this.current){
        child.classList.add(this.selectID);
        this.current = child;
    }
};
DOMArrowSelect.prototype.unSelectAll = function unSelectAll (){
        var this$1 = this;


    arrayFrom(this.element.querySelectorAll('.'+this.selectID))
    .forEach(function (child){
        child.classList.remove(this$1.selectID);
    });
    this.current = null;
};
DOMArrowSelect.prototype.selectAll = function selectAll (){
        var this$1 = this;

    var list = this.element.children;
    for(var i=0; i<list.length; i++){
        list[i].classList.add(this$1.selectID);
    }
    this.current = list[list.length - 1];
};

function arrowSelect(element, options){
    return new DOMArrowSelect(element, options);
}

module.exports = arrowSelect;
//# sourceMappingURL=bundle.js.map
