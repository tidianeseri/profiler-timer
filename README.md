# Javascript Code Profiler
This package is a runtime profiler to time the execution of block of codes

## Installation
npm install --save-dev profiler-timer

## Usage
```typescript
import Profiler from 'profiler-timer';

const profiler = new Profiler('my test')
profiler.start();

myFunction1(); // 3 seconds to execute
profiler.showLapTime();

profiler.interTime(); // start intermediate timer
myFunction2() // 5 seconds to execute
profiler.showInterTime('function2 timer', true)

myFunction3() // 2 seconds to execute

profiler.end(); // not mandatory, showFullTime() will also end the profiler
profiler.showFullTime();
```
```sh
my test | Lap time: 3s 0.145465ms
my test | Lap function2 timer time: 8s 1.27252ms
my test | function2 timer time: 5s 0.978981ms
my test | Full time: 10s 8.583801ms
```
