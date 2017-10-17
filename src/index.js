import events from 'dom-eve';
import domStep from 'dom-step';

let keySet = {
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
    let range = options.range;
    let wrap = options.wrap;
    Object.defineProperties(opts[step], {
        range: {
            set(v){
                range = v;
            },
            get(){
                return range || self.range;
            }
        },
        wrap: {
            set(v){
                wrap = v;
            },
            get(){
                return wrap || self.wrap;
            }
        }
    });
    return opts;
}

function createStepOptions(options, self){
    let opts = {};
    stepOption(opts, options, 'down', self);
    stepOption(opts, options, 'up', self);
    stepOption(opts, options, 'left', self);
    stepOption(opts, options, 'right', self);
    return options;
}

class DOMArrowSelect {
    constructor(element, {
        step = {},
        selected = null,
        range = 1,
        wrap = 5
    } = {}){

        this.range = range;
        this.wrap = wrap;

        this.step = createStepOptions(step, this);

        const tracker = this.tracker = events.track();

        events(document, tracker).on('keyup', event=>{

            try{
                let key = getKey(event.which || event.keyCode);

                if(key){
                    let el = element.querySelector('.'+selected);
                    let next = null;
                    if(!el){
                        if(['down', 'right'].indexOf(key) !== -1){
                            let rect = element.getBoundingClientRect();
                            next = document.elementFromPoint(
                                rect.left + 10,
                                rect.top + 10
                            );
                        }else if(['up', 'left'].indexOf(key) !== -1){
                            let rect = element.getBoundingClientRect();
                            next = document.elementFromPoint(
                                rect.right - 10,
                                rect.bottom - 10
                            );
                        }
                    }else{
                        next = domStep(el, key, this.step[key]);
                    }

                    if(next){
                        if(el){
                            el.classList.remove(selected);
                        }
                        next.classList.add(selected);
                    }
                }

            }catch(e){ console.log(e)}

        });

        this.destroy = function(){
            tracker.clear();
        };
    }
}

export default function arrowSelect(element, options){
    return new DOMArrowSelect(element, options);
}
