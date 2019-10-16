# COUNTER MADNESS!!!

The goal of this lab is to practice base React and RN skills. In particular, we will practice:
- definition of components
- basic UI components 
- setState
- layout and styling of components
- component lifecycle

To get started, you should go to [https://snack.expo.io]. You can select any rendering you want (Android, iOS, Web), although it's probably quicker to just pick the web rendering.

The first thing you will do is to re-implement both counter we did (the one with increment and decrement buttons, and the auto-incrementing one) in React Native. After that, it's up to you! Here are some things you can do, try to do as many as possible.

- Create a bunch of counters.
- Change their style: background color, font color, font size, margin, padding ...
- Arrange the counters in column layout
- Arrange them in row layout
- Arrange them in a grid layout

- Increase the increment step for the counters
- Control auto-increment speed: faster/slower
- Change counter type from manual to auto-increment and vice-versa
- Let counters skip numbers (all/odd/none)
- Allow to add new counters.
- Have counters that changes colour, font size, if count is odd or even, or if it is divisible by 10, etc
- Have a counter with random styles
- Have counter that move around the grid
- Sort the counters by their count

### setInterval

```javascript
const nMillis = 1000; // number of milliseconds
this.interval = setInterval(() => {
    // code of function to be called
    }, nMillis);
    
// later ....
clearInterval(this.interval)
```
