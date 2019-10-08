
# Higher-order functions and functional programming

## FP in JS

To adhere to functional programming principles in JS, you should:
- try to define as many pure functions as possible
- declare `const` variables rather than `let` variables.
- use higher-order functions instead of for, while loops.
- limit state mutations, particularly in classes.

## Higher-order functions on lists
Since JS functions can be passed as arguments, a lot of data transformations can be expressed with higher-order functions in the functional programming paradigm. These replace many usages of for or while loops in other languages.

- [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) `[x] (x => bool) => bool`: Takes a list and a predicate (a function that takes a list element and returns a boolean). Returns true if **all elements** in the list satisfy the predicate, false otherwise.
- [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) `[x] (x => bool) => bool`: takes a list and a predicate. Returns true if **at least one element** in the list satisfies the predicate, false otherwise.
- [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) `[x] (x => bool) => x`: takes a list and a predicate. Returns the **first element** that satisfy the predicate (if none satisfy it, returns `undefined`)
- [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) `[x] (x => bool) => [x]`: takes a list and a predicate. Returns a new list with all the elements that satisfy the predicate.

- [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) `[x] (x => y) => undefined`: Takes a list and a function f, and applies f to each list element. 
- [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) `[x] (x => y) => [y]`: Takes a list and a function f, applies f to each list element, and returns all the results. 
- [flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) `[x] (x => [y]) => [y]`: same thing as map, but if f returns a list, the result will be nested lists. So flatMap flattens the resulting list before returning it.
- [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) `[x] (y x => y) y`. Takes a list, an initial value, and a function. Applies the function to each element in turn, accumulating the results. Returns a single result.
- [reduceRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) `[x] (y x => y) y`. Same thing as reduce, but start from the right.

Note: in JS, the HOFs are methods of arrays, rather than taking a list as an argument. Furthermore, most of the HOF for arrays may also take as argument the current index in the array, and the array contents, if they need it.

```javascript
const list = [1, 2, 3, 4, 5, 6]
const squares = list.map(x => x * x)
const bigSquares = squares.filter(x => x > 10)
const bigSum = bigSquares.reduce(acc, x => acc + x)
```

## HOFs on functions

Other HOFs just take another function as argument:
- [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) `(x y z => t) x y z => t`
- [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) `(x y z => t) [x y z] => t`
- [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)  `(x y z => t) x => (y z => t)`, to perform partial evalaution

```javascript
const twoArgFunc = (x, y) => x * y
const oneArgFunc = twoArgFunc.bind(twoArgFunc, 2)
```

Often, defining closures with anonymous functions is easier. 
```javascript
const twoArgs = (x, y) => x * y
const bind1 = (f, x) => ((y) => f(x, y))
const oneArg = bind1(twoArgs, 2)
```

It's easier to bind other arguments in this way:
```javascript
const divide = (x, y) => x / y
const bind2 = (f, y) => ((x) => f(x, y))
const div2 = bind2(twoArgs, 2)
```

