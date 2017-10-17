import events from 'dom-eve';
import domStep from 'dom-step';
import arrayFrom from 'array-from';
import createStepOptions from './lib/step_options.js';
import getKey from './lib/get_key.js';

function getCorner(element, dir, {
    xrange = 10, yrange = 10, depth = 5
} = {}){

    let el, parent, i=0;

    if(['down', 'right', -1].indexOf(dir) !== -1){
        let rect = element.getBoundingClientRect();
        el = document.elementFromPoint(
            rect.left + xrange,
            rect.top + yrange
        );
    }else if(['up', 'left', 1].indexOf(dir) !== -1){
        let rect = element.getBoundingClientRect();
        el = document.elementFromPoint(
            rect.right - xrange,
            rect.bottom - yrange
        );
    }

    parent = el;

    for(let i=0; i<depth; i++){
        el = parent;
        parent = parent.parentNode;
        if(parent === element){
            return el;
        }
    }
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
                    next = getCorner(element, key);
                }else{
                    next = domStep(el, key, this.step[key]);
                }

                if(next){
                    //The parent is in the document
                    if(element.parentNode){
                        selected.call(this, next, this.current);
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
