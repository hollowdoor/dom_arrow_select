import arrowSelect from '../';

arrowSelect(document.querySelector('#vertical'), {
    selected: 'selected',
    step: {
        down: {
            wrap: 5,
            range: 3
        },
        up: {
            wrap: 5,
            range: 3
        }
    }
});
