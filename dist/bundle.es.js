import events from 'dom-eve';
import domStep from 'dom-step';
import arrayFrom from 'array-from';

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

function getCorner(element, dir, ref){
    if ( ref === void 0 ) ref = {};
    var xrange = ref.xrange; if ( xrange === void 0 ) xrange = 10;
    var yrange = ref.yrange; if ( yrange === void 0 ) yrange = 10;
    var depth = ref.depth; if ( depth === void 0 ) depth = 5;


    var el, parent, i=0;

    if(['down', 'right', -1].indexOf(dir) !== -1){
        var rect = element.getBoundingClientRect();
        el = document.elementFromPoint(
            rect.left + xrange,
            rect.top + yrange
        );
    }else if(['up', 'left', 1].indexOf(dir) !== -1){
        var rect$1 = element.getBoundingClientRect();
        el = document.elementFromPoint(
            rect$1.right - xrange,
            rect$1.bottom - yrange
        );
    }

    parent = el;

    for(var i$1=0; i$1<depth; i$1++){
        el = parent;
        parent = parent.parentNode;
        if(parent === element){
            return el;
        }
    }
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
                next = getCorner(element, key);
            }else{
                next = domStep(el, key, this$1.step[key]);
            }

            if(next){
                //The parent is in the document
                if(element.parentNode){
                    selected.call(this$1, next, this$1.current);
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

export default arrowSelect;
//# sourceMappingURL=bundle.es.js.map
