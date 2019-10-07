# JavaScript, ES6 and Functional Programming

Javascript is one of the most popular languages in the world. It is the language with the most repositories on [GitHub](https://octoverse.github.com/projects), and the most used in the annual StackOverflow [survey](https://insights.stackoverflow.com/survey/2018). Of note, on both of these rankings, TypeScript is rising rapidly.

## A bit of history

This is a short summary of the history of JavasScript. See [Wikipedia](https://en.wikipedia.org/wiki/JavaScript) for more.

Why JavaScript? Marc Andreessen, the founder of Netscape (one of the first web browsers), believed that HTML needed a "glue language" that was easy to use by Web designers and part-time programmers to assemble components such as images and plugins, where the code could be written directly in the Web page markup. The "ease of use" aspect will influence the language considerably.

In 1995, Netscape Communications recruited [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich) to embed the Scheme programming language into its Netscape Navigator. However, his bosses decided that the language should be synctactically similar to Java. The result was a language that had much of the functionality of [Scheme](https://en.wikipedia.org/wiki/Scheme_(programming_language)), the (atypical) object orientation of [Self](https://en.wikipedia.org/wiki/Self_(programming_language)), and the syntax of [Java](https://en.wikipedia.org/wiki/Java_(programming_language)). 

The first version of Javascript was completed in **ten days** in order to accommodate Netscape Navigator's release schedule, and was called Mocha. It was renamed LiveScript in September 1995 and later in the same month JavaScript.

## Standardization

Javascript went through several versions:

- In November 1996, Netscape submits JavaScript to ECMA International to carve out a standard specification. This led to the official release of the language specification ECMAScript in June 1997, with JavaScript being the most well known of the implementations.
- ECMAScript 2 in June 1998 continued the standards process cycle, conforming some modifications to the ISO/IEC 16262 international standard. 
- ECMAScript 3 was released in December 1999 and is the modern-day baseline for JavaScript.
- The original ECMAScript 4 work started in 2000. Microsoft and Yahoo opposed it in 2007, it was never completed. 
- ECMAScript 3.1 was renamed to ECMAScript 5 and released in December 2009.

## Modern Javascript 
After some stagnation, Javascript has been evolving regularly in the last few years:
- ECMAScript 2015 (ES6) was a major update released in June 2015. It solved a lot of problems of previous versions of Javascript. It adds class declarations, import and export of modules, let and const keywords, promises for asynchronous programming, spread operator for arrays, destructuring, ...
- ES7 was released in June 2016 (minor update).
- ES8, was released in June 2017. It includes asynchronous programming with async and await. 
- ES9 was released in June 2018. It incluedes a spread operator for objects.
- ES10 was realeased in June 2019. With it, ECMAScript is now a full superset of JSON.

## Transpiling

Historically, incompatibilities between different implementations of Javascript and various web browsers was a major headache. Nowadays, incompatibilities between various versions of Javascript could also be a major issue, as the latest features are not supported in all browsers. See compatibility [here](https://www.w3schools.com/js/js_versions.asp). The solution used in modern Javascript is [transpiling](https://en.wikipedia.org/wiki/Source-to-source_compiler). A transpiler converts one programming language source code into another. In the case of Javascript, [Babel](https://babeljs.io) compiles recent Javascript versions into ES5 Javascript, which is widely supported.

## Javascript is weird!

Due to its history, Javascript has some strange behavior. 



### Primitives

Javascript has a handful of primitive types, which do not have associated methods.
- undefined: for just declared variables with no value, or argument that don't have values 
- null: an initialized variable, with an intentionally non-existent value
- boolean: true or false
- string: a sequence of characters
- number: a double-precision 64 bit floating point number. No specific type for integer (`2` is a number).
- bigint: an arbitrary large integer. `2n` is `2` as a bigint.
- symbol: a unique and immutable value, usable as a key for objects

### Objects and Prototypes
Since it is influenced by Self, Javascript is a prototype-based OO language. Prototype-based OO languages don't have classes. Instead, a "prototype" can be cloned in order to create a new object similar to the previous one. The new object can then be modified to add new behaviour, by (even dynamically) adding new properties. While a prototype-based system can emulate classes (and vice-versa), it's not very convenient. In ES6, it is also possible to create classes.

Object in Javascript are collections of properties, each with a key and a value. Since JS objects can have new properties, they can be used as hashmaps. ES6 also supports dedicated Maps, which have better performance. Objects can be declared in the following manner: `{key: 'value', key2: 32, key3: {nestedObject: {moreNesting: 'enoughNesting'}}}`.

Arrays are Objects that support integer-based indexing. They can be declared like so: `[1, 2, 3]`.


### Type conversions
Javascript is dynamically typed, and is very "forgiving" of mistakes. This makes sense in the context of short programs being written by non-programmers. But for larger programs, it makes it very easy to introduce bugs. In particular, Javascript implicitly converts objects of different types so that they are compatible with each other. But the results are not always (or often) as one would expect. Try to guess the results of these expressions:
- `'2' * 2`
- `'2' + 2`
- `2 + false`
- `2 + true`
- `(2 - true - true == false) + 1`
- `('2' - true - true )`
- `('2' + true - true )`

For a fun take on this, have a look at the [wat video](https://www.destroyallsoftware.com/talks/wat).

### Truthy and Falsy; `==` vs `===`

Due to the implicit type conversions, in Javascript, a lot of things can evalaute to "true" or "false", which is convenient to write short if statements, but can be hard to understand at scale. To increase clarity, a stricter equality operator, with a more intuitive behaviour, was introduced. That's why most JS code uses `===` instead of `==`. Similarly, JS code uses `!==` rather than `!=`. For a nice summary of how `==`, `===`, `!=`, `!==` and `if()` work, have a look at [JavaScript equality table](https://dorey.github.io/JavaScript-Equality-Table/). The overall conclusion: always use `===` or `!==`, unless you have a very good reason not to.

### Functions

In Javascript (as in many other languages), functions can be passed as arguments to other functions, or returned from functions. This allows to define powerful abstractions. For instance, event handlers can take a function as argument, and call it when an event happens.

### Scope

Scope refers to how a declared variable is visible in a program. JS variables (declared with `var`) can be declared at the function level, or the global level. With `var`, there is no block scope, as in most other languages:
- Variables declared inside a block can be accessed from outside the block.
- Redeclaring a variable inside a block will also redeclare it outside the block
- Since Javascript is "error forgiving", `var`iables can be used before being declared (they will be "hoisted" to the top of the function). 

An undeclared variable will be declared as a global variable, which can lead to subtle and hard to track bugs.


### Strict mode
Strict mode is an evalaution mode for Javascript that is less forgiving of errors. Errors will be thrown instead of being silently dealt with. Code that in ES6 modules is in strict mode, so most of the code you will write will be in strict mode. See more on strict mode [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

## ES6

ES6 introduces many enhancements to JavaScript. In particular, ES6 introduces:
- `let` and `const` variables, with proper block scope and no hoisting. Essentially, `const` should be use as much as possible, and **`var` should never be used now**.
- Arrow functions, which are shorter definitions for functions, which have better scoping, particularly for the `this` keyword.
- First-class support for classes.
- Modules, import, and export to manage larger amounts of code.
- Destructuring assignments and spread operators to access data inside objects, and to easily build new objects.
- Default values for arguments in functions.
- Promises for asynchronous code (ES8 introduces async/await keywords)

A nice summary of ES6 features is available [here](https://zellwk.com/blog/es6/).

After this introduction, you're ready to practice JS and ES6 with the [JS and ES6 koans](https://github.com/rrobbes/EngineeringOfMobileSystems/tree/master/lab1-jskoans).