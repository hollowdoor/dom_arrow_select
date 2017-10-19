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
        if(side === 'down'){
            this.unSelect(current);
            this.focus('#horizontal');
            this.selectIndex(0);
        }else if(side === 'up'){
            this.unSelect(current);
            this.focus('#vertical');
            this.selectIndex(-1);
        }
    }
    /*step: {
        down: {
            wrap: 10,
            range: 3
        },
        up: {
            wrap: 5,
            range: 3
        }
    }*/
});

as.focus('#vertical');

setTimeout(()=>{

    as.selectAll();
    setTimeout(()=>{
        as.unSelectAll();
    }, 1000);
}, 1);
