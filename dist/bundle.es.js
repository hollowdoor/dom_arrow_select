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

var DOMArrowSelect = function DOMArrowSelect(element, ref){
    var this$1 = this;
    if ( ref === void 0 ) ref = {};
    var step = ref.step; if ( step === void 0 ) step = {};
    var selected = ref.selected; if ( selected === void 0 ) selected = null;
    var range = ref.range; if ( range === void 0 ) range = 1;
    var wrap = ref.wrap; if ( wrap === void 0 ) wrap = 5;


    ['down', 'up', 'left', 'right'].forEach(function (key){
        step[key] = step[key] || {};
        step[key].range = step[key].range || range;
        step[key].wrap = step[key].wrap || wrap;
    });

    this.step = step;

    var tracker = this.tracker = events.track();

    console.log('step ',step);

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
                    console.log('stepping');
                    next = domStep(el, key, this$1.step[key]);
                }

                console.log('el ',el);
                console.log('next ',next);

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
