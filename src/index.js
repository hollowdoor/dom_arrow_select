import events from 'dom-eve';
import domStep from 'dom-step';
import arrayFrom from 'array-from';
import getCorner from 'dom-get-corner';
import createStepOptions from './lib/step_options.js';
import getKey from './lib/get_key.js';

function isEdge(el, child){
    if(el.children[el.children.length - 1] === child){
        return 'last';
    }else if(el.children[0] === child){
        return 'first';
    }
    return null;
}

class DOMArrowSelect {
    constructor(element, {
        step = {},
        selectID = 'dom-arrow-select-selected',
        selected = function(next, prev){
            this.unSelect(prev);
            this.select(next);
        },
        range = 1,
        wrap = 5
    } = {}){

        this.range = range;
        this.wrap = wrap;
        this.element = element;
        this.current = null;
        this.selectID = selectID;

        this.step = createStepOptions(step, this);

        const tracker = this.tracker = events.track();

        events(document, tracker).on('keyup', event=>{

            let key = getKey(event.which || event.keyCode);

            if(key){
                let el = this.current;
                let next = null;
                if(!el){
                    next = getCorner(element, key, {
                        reverse:true,
                        xrange: this.step[key].wrap,
                        yrange: this.step[key].wrap
                    });
                }else{
                    next = domStep(el, key, this.step[key]);
                }

                if(next){
                    //The parent is in the document
                    if(element.parentNode){
                        selected.call(this, next, this.current, isEdge(element, next));
                    }
                }
            }
        });

        this.destroy = function(){
            tracker.clear();
        };
    }
    unSelect(child){

        if(child){
            if(child.parentNode !== this.element){
                throw new TypeError(`${child.outerHTML} is not a child of ${this.element.outerHTML}`);
            }
            child.classList.remove(this.selectID);
            if(this.current === child){
                this.current = null;
            }
        }
    }
    select(child){
        if(child.parentNode !== this.element){
            throw new TypeError(`${child.outerHTML} is not a child of ${this.element.outerHTML}`);
        }

        if(child !== this.current){
            child.classList.add(this.selectID);
            this.current = child;
        }
    }
    unSelectAll(){

        arrayFrom(this.element.querySelectorAll('.'+this.selectID))
        .forEach(child=>{
            child.classList.remove(this.selectID);
        });
        this.current = null;
    }
    selectAll(){
        let list = this.element.children;
        for(let i=0; i<list.length; i++){
            list[i].classList.add(this.selectID);
        }
        this.current = list[list.length - 1];
    }
}

export default function arrowSelect(element, options){
    return new DOMArrowSelect(element, options);
}
