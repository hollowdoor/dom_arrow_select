import arrowSelect from '../';

const as = arrowSelect(document.querySelector('#vertical'), {
    selectID: 'selected',
    /*step: {
        down: {
            wrap: 5,
            range: 3
        },
        up: {
            wrap: 5,
            range: 3
        }
    }*/
});

setTimeout(()=>{

    as.selectAll();
    setTimeout(()=>{
        as.unSelectAll();
    }, 1000);
}, 1000);
