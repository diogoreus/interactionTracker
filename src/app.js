
var $ = require('../node_modules/jquery/dist/jquery.js');
// var Rx = require('../node_modules/rx/dist/rx.all.js');
let intialTime = Date.now();
let interval = 200;

window.Rx = Rx;
window.$ = $;

let stop = document.getElementById('stop');
let clickStream = Rx.Observable.fromEvent(stop, 'click');
let $input = $('input');


window.keyups = Rx.Observable.fromEvent(document, 'keyup')
  // .pluck('target', 'value')
  // .filter(function (text) {
  //   console.log('text: ', text)
  //   return text.length > 2;
  // })
  .subscribe((e) => {
    console.log(e)    
  });

console.log('stop', stop)
console.log('$input', $input)

let observable = Rx.Observable.fromEvent(document, 'mousemove');

var subscription = observable   
  .filter((e) => {
    var timeStamp = e.timeStamp,
        time = timeStamp - intialTime;
    
    if(time > interval){
      intialTime = Date.now();
      return e;
    }
  })
  .distinctUntilChanged()
  .subscribe((e) => {
    // console.log(e)
    $('h1').text(e.clientX + ',' + e.clientY);
  });

window.subscription = subscription;

// var source = Rx.Observable
//   .timer(200, 100)
//   .timeInterval()
//   .pluck('interval')
//   .take(3);

// var subscription = source.subscribe(
//     function (x) {
//         console.log('Next: ' + x);
//     },
//     function (err) {
//         console.log('Error: ' + err);
//     },
//     function () {
//         console.log('Completed');
//     });

/*


let intialTime = Date.now();
window.posArray = [];
let pos = {
  x: 0,
  y: 0,
  time: 0
};
let interval;

let mousemove = (e) => {
  // console.log(e);
  // console.log('clientX / clientY: ', e.clientX, e.clientY);

  // console.log('offsetX / offsetY ', e.offsetX, e.offsetY);
  // console.log('pageX / pageY ', e.pageX, e.pageY);

  // console.log('timeStamp: ', e.timeStamp - intialTime);

  pos.x = e.pageX;
  pos.y = e.pageY;
  pos.time = e.timeStamp - intialTime;
}

let getPos = () => {
  // console.log(pos.x + " / " + pos.y + " / " + pos.time);
  posArray.push(pos);
}

let trackMouse = (e) => {
  console.log('TRACK ----');
  document.addEventListener("mousemove", mousemove, false);
  interval = window.setInterval(getPos, 100);
}

let play = document.getElementById('play');
play.addEventListener("click", trackMouse, false);

let untrackMouse = (e) => {
  console.log('UNTRACK ----');
  document.removeEventListener("mousemove", mousemove, false);
  window.clearInterval(interval);
}

let stop = document.getElementById('stop');
stop.addEventListener("click", untrackMouse, false);

*/