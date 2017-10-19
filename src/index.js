import events from 'dom-eve';
import domStep from 'dom-step';
import arrayFrom from 'array-from';
import getCorner from 'dom-get-corner';
import getElement from 'dom-get-element';
import getKey from './lib/get_key.js';

class DOMArrowSelect {
    constructor({
        selectID = 'dom-arrow-select-selected',
        selected = function(next, prev){
            this.unSelect(prev);
            this.select(next);
        },
        outside = function(){},
        step = function(){}
    } = {}){

        this.element = null;
        this.current = null;

        Object.defineProperty(this, 'selectID', {
            value: selectID,
            enumerable: true
        });

        const getStepOpts = dir=>{
            return step.call(this, dir) || {};
        };

        const tracker = this.tracker = events.track();

        events(document, tracker).on('keyup', event=>{
            let element = this.element;
            let key = getKey(event.which || event.keyCode);

            if(key && element.parentNode){
                let el = this.current;
                let next = null;
                let opts = getStepOpts(key);
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
                        this,
                        next,
                        this.current
                    );
                }else{
                    outside.call(
                        this,
                        this.current
                    );
                }
            }
        });

        this.destroy = function(){
            tracker.clear();
        };
    }
    focus(element){
        this.element = getElement(element);
        return this;
    }
    unSelect(child){
        if(child === null) return this;
        child = getElement(child);

        if(child){
            if(child.parentNode !== this.element){
                throw new TypeError(`${child.outerHTML} is not a child of ${this.element.outerHTML}`);
            }
            child.classList.remove(this.selectID);
            if(this.current === child){
                this.current = null;
            }
        }
        return this;
    }
    select(child){
        if(child === null) return this;
        child = getElement(child);

        if(child.parentNode !== this.element){
            throw new TypeError(`${child.outerHTML} is not a child of ${this.element.outerHTML}`);
        }

        if(child !== this.current){
            child.classList.add(this.selectID);
            this.current = child;
        }
        return this;
    }
    unSelectAll(){

        arrayFrom(this.element.querySelectorAll('.'+this.selectID))
        .forEach(child=>{
            child.classList.remove(this.selectID);
        });
        this.current = null;
        return this;
    }
    selectAll(){
        let list = this.element.children;
        for(let i=0; i<list.length; i++){
            list[i].classList.add(this.selectID);
        }
        this.current = list[list.length - 1];
        return this;
    }
}

export default function arrowSelect(element, options){
    return new DOMArrowSelect(element, options);
}
