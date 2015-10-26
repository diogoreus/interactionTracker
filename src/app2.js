var stampit = require('stampit');

const PrependLogger = stampit.methods({
  log(obj) {
    console.log(this.prefix, obj);
  }
}).state({
  prefix: 'STDOUT: '
});
const originalLogger = PrependLogger();
originalLogger.log('hello');


// -----

const Cloneable1 = stampit.init(({ instance, stamp }) => {
  console.log('Instance: ', instance);
  instance.clone = () => stamp(instance);
});
const CloneablePrependLogger1 = PrependLogger.compose(Cloneable1);
const logger1 = CloneablePrependLogger1({ prefix: 'OUT: ' }); // creating first object
const loggerClone1 = logger1.clone(); // cloning the object.
logger1.log('hello'); // OUT: hello
loggerClone1.log('hello'); // OUT: hello


// -----

const Cloneable2 = stampit.init(({ instance, stamp }) => {
  instance.clone = stamp.bind(null, instance);
});
const CloneablePrependLogger2 = PrependLogger.compose(Cloneable2);
const logger2 = CloneablePrependLogger2({ prefix: 'OUT: ' }); // creating first object
const loggerClone2 = logger2.clone(); // cloning the object.
logger2.log('hello'); // OUT: hello
loggerClone2.log('hello'); // OUT: hello


// -----

const Cloneable3 = stampit.init(({ instance, stamp }) => {
  if (!stamp.fixed.methods.clone) { // Avoid adding the same method to the prototype twice.
    stamp.fixed.methods.clone = function () { return stamp(this); };
  }
});
const CloneablePrependLogger3 = PrependLogger.compose(Cloneable3);
const logger3 = CloneablePrependLogger3({ prefix: 'OUT: ' });  // creating first object
const loggerClone3 = logger3.clone(); // cloning the object.
logger3.log('hello'); // OUT: hello
loggerClone3.log('hello'); // OUT: hello



// import loadImage from './load-image'

//   let addImg = (src) => {
//     let imgElement =
//       document.createElement("img")
//     imgElement.src = src
//     document.body.appendChild(imgElement)
//   }

//   Promise.all([
//     loadImage('images/cat1.jpg'),
//     loadImage('images/cat2.jpg'),
//     loadImage('images/cat3.jpg'),
//     loadImage('images/cat4.jpg')
//   ]).then((images) => {
//     images.forEach(img => addImg(img.src))
//   }).catch((error) => {
//     // handle error later
//   })

let iterable = [1, 2, 3];
for (let item of iterable) {
    console.log(item); // 1, 2, 3
}

window.teste2 = iterable
	.map(v => v+1)
	.reduce((v) => {
		console.log('Reduce: ', v);
		return v + 3
	}, iterable[0]);	

iterable.map((iten) => {
  console.log(iten)
});

let iterable2 = new Set([{a:1}, {a:1}, {a:1}]);
for (let item of iterable2) {
  console.log(item); // 4, 5, 6
}


let iterable3 = '789';
for (let item of iterable3) {
    console.log(item); // '7', '8', '9'
}

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  teste(asd){
  	console.log('ads')
  }
}

class Square extends Polygon {
  constructor(length=10) { // ES6 features Default Parameters
    super(length, length); //call the parent method with super
    this.name = 'Square';
  }

  get area() { //calculated attribute getter
    return this.height * this.width;
  }
}

window.square = new Square(20);

window.teste = function(a=10, b='teste'){
	console.log(a + ' / ' + b);
};

teste();

window.polygon = new Polygon(200, 400);

let handler = 123;
window.obj = {
    // __proto__
    __proto__: {
    	teste: function(){
    		console.log('proto log')
    	}
    },
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
     // Super calls
     return "d " + super.toString();
    },
    // Computed (dynamic) property names
    [ 'prop_' + (() => 42)() ]: 42,
    [ 'prop_' + handler ]: handler
};



// Multiline strings
`In JavaScript this is
 not legal.`

// String interpolation
var name = "Bob", time = "today";
console.log(`Hello ${name}, 
how are you ${time}?`);


{
    function foo () { return 1 }
    foo() === 1
    {
        function foo () { return 2 }
        foo() === 2
        console.log(foo())
    }
    foo() === 1
    console.log(foo())
}


let s = new Set()
s.add("hello").add("goodbye").add("hello")
s.size === 2
s.has("hello") === true
for (let key of s.values()) // insertion order
    console.log(key)

let m = new Map()
m.set("hello", 42)
m.set(s, 34)
m.get(s) === 34
m.size === 2
for (let [ key, val ] of m.entries())
    console.log(key + " = " + val)

