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

### Prototypes
Since it is influenced by Self, Javascript is a prototype-based OO language. Prototype-based OO languages don't have classes. Instead, a "prototype" can be cloned in order to create a new object similar to the previous one. The new object can then be modified to add new behaviour. While a prototype-based system can emulate classes (and vice-versa), it's not very convenient. In ES6, it is also possible to create classes.

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

