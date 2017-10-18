import arrowSelect from '../';

const as = arrowSelect({
    selectID: 'selected',
    selected(next, prev, edge){
        console.log('edge ', edge)
        this.unSelect(prev);
        this.select(next);
    },
    step: {
        down: {
            wrap: 10,
            range: 3
        },
        up: {
            wrap: 5,
            range: 3
        }
    }
});

as.focus('#vertical');

setTimeout(()=>{

    as.selectAll();
    setTimeout(()=>{
        as.unSelectAll();
    }, 1000);
}, 1000);
