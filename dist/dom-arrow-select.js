var domArrowSelect = (function () {
'use strict';

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var eventsProto = objectAssign(Object.create(null), {
    on: function on(name, cb, options){
        this.element.addEventListener(name, cb, options);
        this._records[name] = this._records[name] || [];
        this._records[name].push([
            name, cb, options
        ]);
        return this;
    },
    off: function off(name, cb, options){
        this.element.removeEventListener(name, cb, options);

        if(this._records[name] !== void 0){
            var records = this._records[name];

            for(var i=0; i<records.length; i++){
                if(records[i][1] === cb && records[i][2] === options){
                    records.splice(i, 1);
                    if(i + 1 !== records.length){
                        --i;
                    }
                }
            }
        }
        return this;
    },
    dispatch: function dispatch(event){
        this.element.dispatchEvent(event);
        return this;
    },
    clear: function clear(){
        var this$1 = this;

        for(var name in this$1._records){
            var records = this$1._records[name];
            records.forEach(function (record){
                (ref = this$1).off.apply(ref, record);
                var ref;
            });
        }
        return this;
    }
});

function events(element, tracker){
    if ( tracker === void 0 ) { tracker = null; }

    var eve = Object.create(eventsProto);
    eve._records = Object.create(null);
    if(typeof element === 'string'){
        eve.element = document.querySelector(element);
    }else{
        eve.element = element;
    }    

    if(tracker){
        tracker.list.push(eve);
    }

    return eve;
}

events.track = function track(){
    return {
        list: [],
        clear: function clear(){
            this.list.forEach(function (item){
                item.clear();
            });
        }
    };
};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var propIsEnumerable$1 = Object.prototype.propertyIsEnumerable;

function toObject$1(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative$1() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign$1 = shouldUseNative$1() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject$1(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty$1.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols$1) {
			symbols = getOwnPropertySymbols$1(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable$1.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

//Supposedly faster for v8 than just Object.create(null)
function Raw(){}
Raw.prototype = (function (){
    //Maybe some old browser has risen from it's grave
    if(typeof Object.create !== 'function'){
        var temp = new Object();
        temp.__proto__ = null;
        return temp;
    }

    return Object.create(null);
})();

function rawObject(){
    var arguments$1 = arguments;

    var objects = [], len = arguments.length;
    while ( len-- ) { objects[ len ] = arguments$1[ len ]; }

    var raw = new Raw();
    objectAssign$1.apply(void 0, [ raw ].concat( objects ));
    return raw;
}

var toStr$2 = Object.prototype.toString;

var isArguments = function isArguments(value) {
	var str = toStr$2.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr$2.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr$1 = Object.prototype.toString;
var slice = Array.prototype.slice;

var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr$1.call(object) === '[object Function]';
	var isArguments$$1 = isArguments(object);
	var isString = isObject && toStr$1.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments$$1) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments$$1 && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArguments(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

var objectKeys = keysShim;

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var foreach = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};

var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = objectKeys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

var defineProperties_1 = defineProperties;

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

var implementation = function isNaN(value) {
	return value !== value;
};

var polyfill = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

var shim = function shimNumberIsNaN() {
	var polyfill$$1 = polyfill();
	defineProperties_1(Number, { isNaN: polyfill$$1 }, { isNaN: function () { return Number.isNaN !== polyfill$$1; } });
	return polyfill$$1;
};

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

defineProperties_1(implementation, {
	getPolyfill: polyfill,
	implementation: implementation,
	shim: shim
});

var isNan = implementation;

function isElement(input){
  return (input != null)
    && (typeof input === 'object')
    && (input.nodeType === Node.ELEMENT_NODE)
    && (typeof input.style === 'object')
    && (typeof input.ownerDocument === 'object');
}

//If there are problems with getBoundingClientRect
//See https://github.com/webmodules/bounding-client-rect
function getRect(e){
    return e.getBoundingClientRect();
}

function height(rect){
    return rect.bottom - rect.top;
}

function width(rect){
    return rect.right - rect.left;
}

//Some modules exist for this,
//but they do runtime exports (not static)
function isVisible(el){
    return el.offsetParent !== null
}

function result(directions, el, direction){
    return isVisible(el)
    ? el
    : directions[direction](el);
}

function getSibling(element, x, y){
    var el = document.elementFromPoint(x, y);
    var parent = el, i=0, limit = 5;
    if(!el) { return; }
    for(var i$1=0; i$1<limit; i$1++){
        el = parent;
        if(!el) { return; }
        parent = el.parentNode;
        if(parent === element.parentNode){
            return el;
        }
    }
}

var directions = rawObject({
    left: function left(element, range, wrap){
        if ( wrap === void 0 ) { wrap = 0; }

        var rect = getRect(element);
        var x = rect.left - range,
            y = rect.top + (height(rect) / 2);

        var el = getSibling(element, x, y);
        if(el){
            return result(this, el, 'left');
        }

        if(wrap){
            var prect = getRect(element.parentNode);
            x = prect.right - wrap;
            var el$1 = getSibling(element, x, y);
            if(el$1){
                return result(this, el$1, 'left');
            }
        }
    },
    up: function up(element, range, wrap){
        if ( wrap === void 0 ) { wrap = 0; }

        var rect = getRect(element);
        var x = rect.left + (width(rect) / 2),
            y = rect.top - range;

        var el = getSibling(element, x, y);
        if(el){
            return result(this, el, 'up');
        }

        if(wrap){
            var prect = getRect(element.parentNode);
            y = prect.bottom - wrap;
            var el$1 = getSibling(element, x, y);
            if(el$1){
                return result(this, el$1, 'up');
            }
        }
    },
    right: function right(element, range, wrap){
        if ( wrap === void 0 ) { wrap = 0; }

        var rect = getRect(element);
        var x = rect.right + range,
            y = rect.top + (height(rect) / 2);

        var el = getSibling(element, x, y);
        if(el){
            return result(this, el, 'right');
        }

        if(wrap){
            var prect = getRect(element.parentNode);
            x = prect.left + wrap;

            var el$1 = getSibling(element, x, y);
            if(el$1){
                return result(this, el$1, 'right');
            }
        }
    },
    down: function down(element, range, wrap){
        if ( wrap === void 0 ) { wrap = 0; }

        var rect = getRect(element);
        var x = rect.left + (width(rect) / 2),
            y = rect.bottom + range;

        var el = getSibling(element, x, y);
        if(el){
            return result(this, el, 'down');
        }

        if(wrap){
            var prect = getRect(element.parentNode);
            y = prect.top + wrap;

            var el$1 = getSibling(element, x, y);
            if(el$1){
                return result(this, el$1, 'down');
            }
        }
    }
});

function step(element, direction, ref){
    if ( ref === void 0 ) { ref = {}; }
    var range = ref.range; if ( range === void 0 ) { range = 1; }
    var wrap = ref.wrap; if ( wrap === void 0 ) { wrap = 0; }


    if(!isElement(element)){
        throw new TypeError(("element is not a DOM element. Instead element is equal to " + element + "."))
    }

    if(directions[direction] === void 0){
        throw new TypeError(("direction should be up, down, left, or right. Instead direction is equal to " + direction + "."));
    }

    if(isNan(range)){
        throw new TypeError(("options.range should be a number. Instead options.range is equal to " + range));
    }

    return directions[direction](element, range, wrap);
}

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: http://www.ecma-international.org/ecma-262/6.0/#sec-array.from
var polyfill$2 = (function() {
  var isCallable = function(fn) {
    return typeof fn === 'function';
  };
  var toInteger = function (value) {
    var number = Number(value);
    if (isNaN(number)) { return 0; }
    if (number === 0 || !isFinite(number)) { return number; }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };
  var maxSafeInteger = Math.pow(2, 53) - 1;
  var toLength = function (value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };
  var iteratorProp = function(value) {
    if(value != null) {
      if(['string','number','boolean','symbol'].indexOf(typeof value) > -1){
        return Symbol.iterator;
      } else if (
        (typeof Symbol !== 'undefined') &&
        ('iterator' in Symbol) &&
        (Symbol.iterator in value)
      ) {
        return Symbol.iterator;
      }
      // Support "@@iterator" placeholder, Gecko 27 to Gecko 35
      else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };
  var getMethod = function(O, P) {
    // Assert: IsPropertyKey(P) is true.
    if (O != null && P != null) {
      // Let func be GetV(O, P).
      var func = O[P];
      // ReturnIfAbrupt(func).
      // If func is either undefined or null, return undefined.
      if(func == null) {
        return void 0;
      }
      // If IsCallable(func) is false, throw a TypeError exception.
      if (!isCallable(func)) {
        throw new TypeError(func + ' is not a function');
      }
      return func;
    }
  };
  var iteratorStep = function(iterator) {
    // Let result be IteratorNext(iterator).
    // ReturnIfAbrupt(result).
    var result = iterator.next();
    // Let done be IteratorComplete(result).
    // ReturnIfAbrupt(done).
    var done = Boolean(result.done);
    // If done is true, return false.
    if(done) {
      return false;
    }
    // Return result.
    return result;
  };

  // The length property of the from method is 1.
  return function from(items /*, mapFn, thisArg */ ) {
    'use strict';

    // 1. Let C be the this value.
    var C = this;

    // 2. If mapfn is undefined, let mapping be false.
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;

    var T;
    if (typeof mapFn !== 'undefined') {
      // 3. else
      //   a. If IsCallable(mapfn) is false, throw a TypeError exception.
      if (!isCallable(mapFn)) {
        throw new TypeError(
          'Array.from: when provided, the second argument must be a function'
        );
      }

      //   b. If thisArg was supplied, let T be thisArg; else let T
      //      be undefined.
      if (arguments.length > 2) {
        T = arguments[2];
      }
      //   c. Let mapping be true (implied by mapFn)
    }

    var A, k;

    // 4. Let usingIterator be GetMethod(items, @@iterator).
    // 5. ReturnIfAbrupt(usingIterator).
    var usingIterator = getMethod(items, iteratorProp(items));

    // 6. If usingIterator is not undefined, then
    if (usingIterator !== void 0) {
      // a. If IsConstructor(C) is true, then
      //   i. Let A be the result of calling the [[Construct]]
      //      internal method of C with an empty argument list.
      // b. Else,
      //   i. Let A be the result of the abstract operation ArrayCreate
      //      with argument 0.
      // c. ReturnIfAbrupt(A).
      A = isCallable(C) ? Object(new C()) : [];

      // d. Let iterator be GetIterator(items, usingIterator).
      var iterator = usingIterator.call(items);

      // e. ReturnIfAbrupt(iterator).
      if (iterator == null) {
        throw new TypeError(
          'Array.from requires an array-like or iterable object'
        );
      }

      // f. Let k be 0.
      k = 0;

      // g. Repeat
      var next, nextValue;
      while (true) {
        // i. Let Pk be ToString(k).
        // ii. Let next be IteratorStep(iterator).
        // iii. ReturnIfAbrupt(next).
        next = iteratorStep(iterator);

        // iv. If next is false, then
        if (!next) {

          // 1. Let setStatus be Set(A, "length", k, true).
          // 2. ReturnIfAbrupt(setStatus).
          A.length = k;

          // 3. Return A.
          return A;
        }
        // v. Let nextValue be IteratorValue(next).
        // vi. ReturnIfAbrupt(nextValue)
        nextValue = next.value;

        // vii. If mapping is true, then
        //   1. Let mappedValue be Call(mapfn, T, «nextValue, k»).
        //   2. If mappedValue is an abrupt completion, return
        //      IteratorClose(iterator, mappedValue).
        //   3. Let mappedValue be mappedValue.[[value]].
        // viii. Else, let mappedValue be nextValue.
        // ix.  Let defineStatus be the result of
        //      CreateDataPropertyOrThrow(A, Pk, mappedValue).
        // x. [TODO] If defineStatus is an abrupt completion, return
        //    IteratorClose(iterator, defineStatus).
        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        }
        else {
          A[k] = nextValue;
        }
        // xi. Increase k by 1.
        k++;
      }
      // 7. Assert: items is not an Iterable so assume it is
      //    an array-like object.
    } else {

      // 8. Let arrayLike be ToObject(items).
      var arrayLike = Object(items);

      // 9. ReturnIfAbrupt(items).
      if (items == null) {
        throw new TypeError(
          'Array.from requires an array-like object - not null or undefined'
        );
      }

      // 10. Let len be ToLength(Get(arrayLike, "length")).
      // 11. ReturnIfAbrupt(len).
      var len = toLength(arrayLike.length);

      // 12. If IsConstructor(C) is true, then
      //     a. Let A be Construct(C, «len»).
      // 13. Else
      //     a. Let A be ArrayCreate(len).
      // 14. ReturnIfAbrupt(A).
      A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 15. Let k be 0.
      k = 0;
      // 16. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = arrayLike[k];
        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        }
        else {
          A[k] = kValue;
        }
        k++;
      }
      // 17. Let setStatus be Set(A, "length", len, true).
      // 18. ReturnIfAbrupt(setStatus).
      A.length = len;
      // 19. Return A.
    }
    return A;
  };
})();

var arrayFrom = (typeof Array.from === 'function' ?
  Array.from :
  polyfill$2
);

var northEast = ['up', 'left', -1];
var southWest = ['down', 'right', 1];

function getCorner(element, dir, ref){
    if ( ref === void 0 ) { ref = {}; }
    var xrange = ref.xrange; if ( xrange === void 0 ) { xrange = 10; }
    var yrange = ref.yrange; if ( yrange === void 0 ) { yrange = 10; }
    var depth = ref.depth; if ( depth === void 0 ) { depth = 5; }
    var reverse = ref.reverse; if ( reverse === void 0 ) { reverse = false; }


    var el, parent, i=0;
    var ne = northEast;
    var sw = southWest;

    if(reverse){
        ne = southWest;
        sw = northEast;
    }

    if(ne.indexOf(dir) !== -1){
        var rect = element.getBoundingClientRect();
        el = document.elementFromPoint(
            rect.left + xrange,
            rect.top + yrange
        );
    }else if(sw.indexOf(dir) !== -1){
        var rect$1 = element.getBoundingClientRect();
        el = document.elementFromPoint(
            rect$1.right - xrange,
            rect$1.bottom - yrange
        );
    }

    parent = el;

    for(var i$1=0; i$1<depth; i$1++){
        el = parent;
        if(!parent) { return; }
        parent = parent.parentNode;
        if(parent === element){
            return el;
        }
    }
}

function isElement$1(o){
    var type = typeof Element; //HTMLElement maybe
    return (
    type === "object" || type === 'function'
    ? o instanceof Element
    //DOM2
    : !!o
        && typeof o === "object"
        && o.nodeType === 1 //Definitely an Element
        && typeof o.nodeName==="string"
    );
}

function getElement(element){
    if(typeof element === 'string'){
        try{
            return document.querySelector(element);
        }catch(e){ throw e; }
    }

    if(isElement$1(element)) { return element; }

    if(!!element && typeof element === 'object'){
        if(isElement$1(element.element)){
            return element.element;
        }else if(isElement$1(element[0])){
            return element[0];
        }
    }

    throw new TypeError(("value (" + element + ") in isElement(value)\n    is not an element, valid css selector,\n    or object with an element property, or index 0."));

}

var keys$1 = rawObject({
    ctrl: false,
    shift: false,
    alt: false,
    key: null,
    keyCode: null,
    which: null
});

var enumerable = true;
var configurable = true;

document.addEventListener('keydown', function (event){
    keys$1.ctrl = event.metaKey || event.ctrlKey;
    keys$1.shift = event.shiftKey;
    keys$1.alt = event.altKey;
    keys$1.keyCode = keys$1.which = (event.which || event.keyCode);
    keys$1.key = event.key;
});

document.addEventListener('keyup', function (event){
    keys$1.ctrl = keys$1.shift = keys$1.alt = false;
    keys$1.key = keys$1.keyCode = keys$1.which = null;
});

function defineProp(dest, prop){
    Object.defineProperty(dest, prop, {
        get: function get(){ return keys$1[prop]; },
        enumerable: enumerable,
        configurable: configurable
    });
}

function mixinKeys(dest){
    for(var name in keys$1){
        if(!dest.hasOwnProperty(name))
            { defineProp(dest, name); }
    }
}

function cleanKeysMixin(dest){
    for(var name in keys$1){
        delete dest[name];
    }
}

var keySet = {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down'
};

function getKey(keyCode){
    return keySet[keyCode] || null;
}

var DOMArrowSelect = function DOMArrowSelect(ref){
    var this$1 = this;
    if ( ref === void 0 ) ref = {};
    var selectID = ref.selectID; if ( selectID === void 0 ) selectID = 'dom-arrow-select-selected';
    var selected = ref.selected; if ( selected === void 0 ) selected = function(next, prev){
        this.unSelect(prev);
        this.select(next);
    };
    var outside = ref.outside; if ( outside === void 0 ) outside = function(){};
    var step$$1 = ref.step; if ( step$$1 === void 0 ) step$$1 = function(){};


    this.element = null;
    this.current = null;
    this._selected = selected;
    this._outside = outside;
    this._stepOpts = function(dir){
        return step$$1.call(this, dir) || {};
    };

    Object.defineProperty(this, 'selectID', {
        value: selectID,
        enumerable: true
    });

    mixinKeys(this);

    var tracker = this.tracker = events.track();

    events(document, tracker).on('keydown', function (event){

        var element = this$1.element;
        var key = getKey(event.which || event.keyCode);

        if(key && element && element.parentNode){
            this$1.step(key);
        }
    });

    this.destroy = function(){
        tracker.clear();
        cleanKeysMixin(this);
    };
};
DOMArrowSelect.prototype.step = function step$$1 (key){
    var element = this.element;
    var el = this.current;
    var next = null;
    var ref = this;
        var _stepOpts = ref._stepOpts;
        var _selected = ref._selected;
        var _outside = ref._outside;
    var opts = _stepOpts.call(this, key);

    if(!this.current){
        next = getCorner(element, key, {
            reverse:true,
            xrange: opts.wrap,
            yrange: opts.wrap
        });
    }else{
        next = step(this.current, key, opts);
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
};
DOMArrowSelect.prototype.focus = function focus (element){
    if(!element){
        this.element = element;
        return this;
    }
    this.element = getElement(element);
    return this;
};
DOMArrowSelect.prototype.focused = function focused (element){
    if(!element) { return false; }
    var el = getElement(element);
    return this.element === el;
};
DOMArrowSelect.prototype.swap = function swap (element, direction){
    if(typeof direction !== 'string'){
        return this.unSelectAll().focus(element);
    }
    return this.unSelectAll().focus(element).step(direction);
};
DOMArrowSelect.prototype.unSelect = function unSelect (child){
    if(child === null) { return this; }
    if(!this.element) { return this; }
    child = getElement(child);

    if(child){
        if(child.parentNode !== this.element){
            throw new TypeError(((child.outerHTML) + " is not a child of " + (this.element.outerHTML)));
        }
        child.classList.remove(this.selectID);
        if(this.current === child){
            this.current = null;
        }
    }
    return this;
};
DOMArrowSelect.prototype.select = function select (child){
    if(child === null) { return this; }
    if(!this.element) { return this; }
    child = getElement(child);

    if(child.parentNode !== this.element){
        throw new TypeError(((child.outerHTML) + " is not a child of " + (this.element.outerHTML)));
    }

    if(child !== this.current){
        child.classList.add(this.selectID);
        this.current = child;
    }
    return this;
};
DOMArrowSelect.prototype.unSelectAll = function unSelectAll (){
        var this$1 = this;


    if(!this.element) { return this; }

    arrayFrom(this.element.querySelectorAll('.'+this.selectID))
    .forEach(function (child){
        this$1.unSelect(child);
    });
    this.current = null;
    return this;
};
DOMArrowSelect.prototype.selectAll = function selectAll (){
        var this$1 = this;

    if(!this.element) { return this; }
    var list = this.element.children;
    for(var i=0; i<list.length; i++){
        this$1.select(list[i]);
    }
    this.current = list[list.length - 1];
    return this;
};
DOMArrowSelect.prototype.selectIndex = function selectIndex (index){
    if(!this.element) { return this; }
    if(index < 0){
        index = this.element.children.length + index;
    }
    this.select(this.element.children[index]);
    return this;
};
DOMArrowSelect.prototype.unSelectIndex = function unSelectIndex (index){
    if(!this.element) { return this; }
    if(index < 0){
        index = this.element.children.length + index;
    }
    this.unSelect(this.element.children[index]);
    return this;
};

function arrowSelect(element, options){
    return new DOMArrowSelect(element, options);
}

return arrowSelect;

}());
//# sourceMappingURL=dom-arrow-select.js.map
