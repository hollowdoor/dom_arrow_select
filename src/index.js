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

class DOMArrowSelect {
    constructor(element, {
        step = {},
        selected = null,
        range = 1,
        wrap = 5
    } = {}){

        ['down', 'up', 'left', 'right'].forEach(key=>{
            step[key] = step[key] || {};
            step[key].range = step[key].range || range;
            step[key].wrap = step[key].wrap || wrap;
        });

        this.step = step;

        const tracker = this.tracker = events.track();

        console.log('step ',step)

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
                        console.log('stepping')
                        next = domStep(el, key, this.step[key]);
                    }

                    console.log('el ',el)
                    console.log('next ',next);

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
