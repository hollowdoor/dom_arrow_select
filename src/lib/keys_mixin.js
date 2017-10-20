import rawObject from 'raw-object';

const keys = rawObject({
    ctrl: false,
    shift: false,
    alt: false,
    key: null,
    keyCode: null,
    which: null
});

const enumerable = true;
const configurable = true;

document.addEventListener('keydown', event=>{
    keys.ctrl = event.metaKey || event.ctrlKey;
    keys.shift = event.shiftKey;
    keys.alt = event.altKey;
    keys.keyCode = keys.which = (event.which || event.keyCode)
    keys.key = event.key;
});

document.addEventListener('keyup', event=>{
    keys.ctrl = keys.shift = keys.alt = false;
    keys.key = keys.keyCode = keys.which = null;
});

function defineProp(dest, prop){
    Object.defineProperty(dest, prop, {
        get(){ return keys[prop]; },
        enumerable,
        configurable
    });
}

export function mixinKeys(dest){
    for(let name in keys){
        if(!dest.hasOwnProperty(name))
            defineProp(dest, name);
    }
}

export function cleanKeysMixin(dest){
    for(let name in keys){
        delete dest[name];
    }
}
