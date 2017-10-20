import arrowSelect from '../';
const directions = {
    down: {
        wrap: 10,
        range: 3
    },
    up: {
        wrap: 5,
        range: 3
    }
};

const swap = {
    down(as, side){
        if(as.focused('#horizontal')) return;
        as.swap('#horizontal', side);
    },
    up(as, side){
        if(as.focused('#vertical')) return;
        as.swap('#vertical', side);
    }
};

const as = arrowSelect({
    selectID: 'selected',
    selected(next, prev){
        this.unSelect(prev);
        this.select(next);
    },
    step(side){
        return;// directions[side];
    },
    outside(current, side){
        console.log('current ',current );
        console.log('side ',side)
        if(swap[side]) swap[side](this, side);
    }
});

as.focus('#vertical');

setTimeout(()=>{

    as.selectAll();
    setTimeout(()=>{
        as.unSelectAll();
    }, 1000);
}, 1);
