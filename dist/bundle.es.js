import events from 'dom-eve';
import domStep from 'dom-step';
import arrayFrom from 'array-from';
import getCorner from 'dom-get-corner';
import getElement from 'dom-get-element';

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

    Object.defineProperty(this, 'selectID', {
        value: selectID,
        enumerable: true
    });

    var getStepOpts = function (dir){
        return step.call(this$1, dir) || {};
    };

    var tracker = this.tracker = events.track();

    events(document, tracker).on('keyup', function (event){
        var element = this$1.element;
        var key = getKey(event.which || event.keyCode);

        if(key && element.parentNode){
            var el = this$1.current;
            var next = null;
            var opts = getStepOpts(key);
            if(!el){
                next = getCorner(element, key, {
                    reverse:true,
                    xrange: opts.wrap,
                    yrange: opts.wrap
                });
            }else{
                next = domStep(el, key, opts);
            }

            if(next){
                selected.call(
                    this$1,
                    next,
                    this$1.current
                );
            }else{
                outside.call(
                    this$1,
                    this$1.current
                );
            }
        }
    });

    this.destroy = function(){
        tracker.clear();
    };
};
DOMArrowSelect.prototype.focus = function focus (element){
    this.element = getElement(element);
    return this;
};
DOMArrowSelect.prototype.unSelect = function unSelect (child){
    if(child === null) { return this; }
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


    arrayFrom(this.element.querySelectorAll('.'+this.selectID))
    .forEach(function (child){
        child.classList.remove(this$1.selectID);
    });
    this.current = null;
    return this;
};
DOMArrowSelect.prototype.selectAll = function selectAll (){
        var this$1 = this;

    var list = this.element.children;
    for(var i=0; i<list.length; i++){
        list[i].classList.add(this$1.selectID);
    }
    this.current = list[list.length - 1];
    return this;
};

function arrowSelect(element, options){
    return new DOMArrowSelect(element, options);
}

export default arrowSelect;
//# sourceMappingURL=bundle.es.js.map
