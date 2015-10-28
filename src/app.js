let Rx = require('../node_modules/rx/dist/rx.all.js');

let clickStream = Rx.Observable.fromEvent(document, 'click');
let mouseMoveStream = Rx.Observable.fromEvent(document, 'mousemove');
let keyStream = Rx.Observable.fromEvent(document, 'keyup');

let mouseFilter = require('./filters/mouseMove.js');
let clickFilter = require('./filters/click.js');
let keyFilter = require('./filters/key.js');

window.events = [];

mouseFilter(events, mouseMoveStream);
clickFilter(events, clickStream);
keyFilter(events, keyStream);




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
