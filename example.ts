import Profiler from './src/index';

const profiler = new Profiler('my test');
profiler.start();
console.log('Start')
setTimeout(function () {
  console.log('1st step');
  profiler.showLapTime();

  profiler.interStart();
  setTimeout(function () {
    console.log('2nd step');
    profiler.showInterTime('4sec', true)

    setTimeout(function () {
      console.log('3rd step');
      profiler.end();
      profiler.showFullTime();
    }, 4000);
  }, 2000);
}, 2000);
