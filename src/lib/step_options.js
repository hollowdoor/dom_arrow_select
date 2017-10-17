function stepOption(opts, options, step, self){
    opts[step] = {};
    let range = options.range;
    let wrap = options.wrap;
    Object.defineProperties(opts[step], {
        range: {
            set(v){
                range = v;
            },
            get(){
                return range || self.range;
            }
        },
        wrap: {
            set(v){
                wrap = v;
            },
            get(){
                return wrap || self.wrap;
            }
        }
    });
    return opts;
}

export default function createStepOptions(options, self){
    let opts = {};
    stepOption(opts, options, 'down', self);
    stepOption(opts, options, 'up', self);
    stepOption(opts, options, 'left', self);
    stepOption(opts, options, 'right', self);
    return options;
}
