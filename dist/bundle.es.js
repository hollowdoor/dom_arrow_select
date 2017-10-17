import events from 'dom-eve';
import domStep from 'dom-step';

var keySet = {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down'
};

function getKey(keyCode){
    return keySet[keyCode] || null;
}

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

var DOMArrowSelect = function DOMArrowSelect(element, ref){
    var this$1 = this;
    if ( ref === void 0 ) ref = {};
    var step = ref.step; if ( step === void 0 ) step = {};
    var selected = ref.selected; if ( selected === void 0 ) selected = null;
    var range = ref.range; if ( range === void 0 ) range = 1;
    var wrap = ref.wrap; if ( wrap === void 0 ) wrap = 5;


    this.range = range;
    this.wrap = wrap;

    this.step = createStepOptions(step, this);

    var tracker = this.tracker = events.track();

    events(document, tracker).on('keyup', function (event){

        try{
            var key = getKey(event.which || event.keyCode);

            if(key){
                var el = element.querySelector('.'+selected);
                var next = null;
                if(!el){
                    if(['down', 'right'].indexOf(key) !== -1){
                        var rect = element.getBoundingClientRect();
                        next = document.elementFromPoint(
                            rect.left + 10,
                            rect.top + 10
                        );
                    }else if(['up', 'left'].indexOf(key) !== -1){
                        var rect$1 = element.getBoundingClientRect();
                        next = document.elementFromPoint(
                            rect$1.right - 10,
                            rect$1.bottom - 10
                        );
                    }
                }else{
                    next = domStep(el, key, this$1.step[key]);
                }

                if(next){
                    if(el){
                        el.classList.remove(selected);
                    }
                    next.classList.add(selected);
                }
            }

        }catch(e){ console.log(e);}

    });

    this.destroy = function(){
        tracker.clear();
    };
};

function arrowSelect(element, options){
    return new DOMArrowSelect(element, options);
}

export default arrowSelect;
//# sourceMappingURL=bundle.es.js.map
