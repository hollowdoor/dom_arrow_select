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
        this._selected = selected;
        this._outside = outside;
        this._step = function(dir){
            return step.call(this, dir) || {};
        };

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

            if(key && element && element.parentNode){
                this.step(key);
            }
        });

        this.destroy = function(){
            tracker.clear();
        };
    }
    step(key){
        let element = this.element;
        let el = this.current;
        let next = null;
        let {_step, _selected, _outside} = this;
        let opts = _step.call(this, key);

        if(!this.current){
            next = getCorner(element, key, {
                reverse:true,
                xrange: opts.wrap,
                yrange: opts.wrap
            });
        }else{
            next = domStep(this.current, key, opts);
        }

        if(next){
            _selected.call(
                this,
                next,
                this.current
            );
        }else{
            _outside.call(
                this,
                this.current,
                key
            );
        }
        return this;
    }
    focus(element){
        if(!element){
            this.element = element;
            return this;
        }
        this.element = getElement(element);
        return this;
    }
    unSelect(child){
        if(child === null) return this;
        if(!this.element) return this;
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
        if(!this.element) return this;
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

        if(!this.element) return this;

        arrayFrom(this.element.querySelectorAll('.'+this.selectID))
        .forEach(child=>{
            this.unSelect(child);
        });
        this.current = null;
        return this;
    }
    selectAll(){
        if(!this.element) return this;
        let list = this.element.children;
        for(let i=0; i<list.length; i++){
            this.select(list[i]);
        }
        this.current = list[list.length - 1];
        return this;
    }
    selectIndex(index){
        if(!this.element) return this;
        if(index < 0){
            index = this.element.children.length + index;
        }
        this.select(this.element.children[index]);
        return this;
    }
    deselectIndex(index){
        if(!this.element) return this;
        if(index < 0){
            index = this.element.children.length + index;
        }
        this.unSelect(this.element.children[index]);
        return this;
    }
}

export default function arrowSelect(element, options){
    return new DOMArrowSelect(element, options);
}
