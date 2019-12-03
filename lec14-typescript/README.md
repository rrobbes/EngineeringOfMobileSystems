# Typescript

Typescript is a programming language that builds on top of Javascript, by adding a type system that is able to work with the peculiarities of Javascript. The goal of Typescript is to be able to type existing Javascript code, without changing the logic of the code. This makes Typescript a language that is quite different from other typed languages.

## Advantages of Type Systems
Having static types has several advantages:
- It catches several types of bug early (at compile time), rather than late (at runtime). With good tool support, these bugs can be found even earlier: directly in the IDE, rather than waiting for the code to compile. I'm sure you've already wished Javascript had static types while working in the labs or in the projects.
- Static types help with code refactoring, maintenance, and evolution. Static types can act as a form of documentation (the code shows the expected types of argument and return types), and static types can do part of the job of a test suite (ensuring that the types at least match expectations). 

These aspects are very important when someone is working on a large codebase, especially if not all the code was written by that person. This is the case of most existing codebases.

While the arguments for type systems are attractive, we actually have some empirical evidence. Dr. Stefan Hanenberg has conducted a series of controlled experiments, that consistently show that static type systems have a beneficial impact (disclaimer: yours truly worked with him on some of these). His publications are available [here](https://scholar.google.com/citations?hl=en&user=af-fqpYAAAAJ&view_op=list_works). Two are particularly interesting:
- One finds that both static type systems and documentation are beneficial, but static type systems may be more so [link](http://users.dcc.uchile.cl/~rrobbes/p/ICSE2014-docstypes.pdf).
- Another directly compares Javascript and Typescript in Visual Studio, with or without code completion [link](https://dl.acm.org/citation.cfm?id=2816720)

## "Retrofitted" type systems

Typescript is particular as it is a retrofitted type system. Usually, type systems are developed **before** code is written. This gives the type system designer liberties in how they want to design the type system, what type of behavior they want to forbid, etc.

Retrofitted type systems are different: their goal is to be, as much as possible, compatible with existing code in an existing dynamic language. This means that they must adapt themselves to the way this existing code is written in that language. Even if some existing behaviour is not desirable, it is not a good idea to disallow it, as it would require programmers to change their code when adopting the type system. The more changes are needed, the less likely the type system is likely to be adopted.

In that context, can you think of a strangier or messier programming language than Javascript? I can't. 

Yet, Typescript has a type system retrofitted to Javascript, and is actually the most succesful retrofitted typesystem that exists. In fact, it is ranked as the [10th most popular programming language](https://redmonk.com/sogrady/2019/07/18/language-rankings-6-19/), in a ranking that considers data from Stack Overflow and Github. This shows that the typescript language designers were **extremely successful** in making Typescript useful, and easily adoptable by Javascript users.

## Characteristics of Typescript

Due to the necessity to support the weird language that is Javascript, Typescript has some peculiar characteristics, that most other languages with static type systems don't have.
- **Typescript is a superset of Javascript**. A valid JS file is a valid TS file. Types can be implicit, in which case typescript does type inference as much as it can, or they can be explicit, helping the compiler and being self-documenting.
- **Typescript "compiles to" Javascript**. A TS file is essentially compiled to JS by removing all type annotations (some cases are more complex). To see this in action, the [TypeScript playground](http://www.typescriptlang.org/play/index.html) shows how a TS file (on the left) compiles to a JS file (on the right). 
- **Typescript  <span color="red">errors do not prevent compilation</span>**. To facilitate the migration from JS to TS, TS **does not prevent you to run code with incorrect types**. The reason is that if a developer had to fix hundreds of type errors before running the program for the first time, they would just give up. Typescript also allows some `escape hatches` from the type system (e.g. the `any` type), to ease migration. Of course, in the long term, these `escape hatches` should not be used. One can see TS as a "Type-aware linter" for JS. 
- **Type definitions can be separate from the code**. Someone that would like to use TS, but was using JS librairies, would lose much of the benefit of TS. The problem: there are more than 1 million npm packages. TS allows you to define the types of the librairies that you are using, in case they don't support TS.  While you can do it yourself, **there are a lot of typed definitions for many libraries**, on [Definitely Typed](http://definitelytyped.org). You can also contribute to this repository, by [making a pull request on GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped). In particular, **there are type definitions for React and React Native**.
- **Typescript can be configured**. Each project has a `tsconfig.json` file where various options can be given to the type system, to change its behaviour. Thus, some options can be made more `permissive` or more `strict`; this can help developers migrating from JS to TS. The most important of these options are `noImplicitAny` [link](https://basarat.gitbooks.io/typescript/docs/options/noImplicitAny.html), that disallows code that returns the catch-all `any` type unless explicitely annotated (i.e., you will get a warning if a type can not be inferred), and `strictNullChecks` [link](https://basarat.gitbooks.io/typescript/docs/options/strictNullChecks.html), which forbids variables that have a specified or inferred type to be assigned `null` or `undefined`. The list of compiler options [is available here](https://www.typescriptlang.org/docs/handbook/compiler-options.html).
- **Typescript supports modern Javascript**. Typescript support all modern JS features, such as arrow functions, destructuring assignments and destructuring parameters, classes, rest and spread operators, optional arguments, default argument values, etc, and is able to effectively propagate type information in these cases. **Typescript also supports JSX syntax**.

Regarding the type system itself:

- **Typescript is an optional type system**. Since any valid JS file is a valid TS file, TS can make typed and untyped code coexist. This is known as an [optional type system](https://en.wikipedia.org/wiki/Type_system#Optional_type_systems). More common static type systems (e.g. Java) are [manifest](https://en.wikipedia.org/wiki/Manifest_typing): not providing a type annotation results in an error.
- **Typescript can use type inference**.  In the parts of the code that lack annotations, TS can be quite effective at propagating type annotation through its [type inference](https://en.wikipedia.org/wiki/Type_inference) algorithm. For instance, if a variable is assigned a string literal `const foo = "hello"`, it must be of type `string`. The type inference in TS is actually quite advanced: testing for a type in an if condition allows each branch of the if to use a refined type definition. E.g., if `x` was either a `number` or a `string`, and there is an `if(typeof x === 'string')`, then `x` in the true branch will be of type `string`, while it will be of type `number` in the else branch.
- **Typescript supports union types**. A union type is a variable that can be of two different types. This is very common in Javascript, where the same argument can be of different types. Examples of union types include `number|string`, `string|null` (to explicitely say a variable can be null), `number|boolean`, `number|false`, or even `0|1|2|3|4` (to indicate a set of permissible literal values for a variable). For objects, you can also do intersection types (more on that later).
- **Typescript is a structural type system, not a nominal one**. Most common type systems (e.g. Java's) are [nominal](https://en.wikipedia.org/wiki/Nominal_type_system). Two objects with similar structure but different names will be incompatible. E.g., a `Point` and a `Coordinate` may each have two fields `x` and `y` that are `numbers`, but they are incompatible. This would not work in Javascript, where objects are essentially lists of properties, that can be defined at any time without classes. Typescript is a [structural type system](https://en.wikipedia.org/wiki/Structural_type_system), in which two types are compatible if their structure is similar. So, in TS, a function that expects a `Point` would also accept a `Coordinate`. Note that there are ways to make sure two structural types are incompatibles (see below). **This is one of the main source of "unexpected" behaviour**, if you expect a nominal type system like Java.
- **Typescript supports generics**. Like in Java, where it is possible to define a type depending on another (e.g. an `ArrayList<Car>`), Typescript supports generic types. In fact, this is used in the way React Components are typed.

## Typescript features
Here are a few of Typescript's more concrete characteristics, briefly described:

- **the `any` type**. This is a type that is compatible with all other types, and that can be used as an `escape hatch`, when it is hard to type a particular piece of code. While it is available, it should be avoided if possible.
- **Postfix type annotations**. Unlike Java, where you would put the type first and the variable name second, Typescript does the opposite. For functions, the return type is specified after the arguments: `const add: (x: number, y: number) => number` defines the type of a function that takes two arguments, x, and y, both numbers, and returns a number.
- **Type aliases** can be defined to described types in a more succinct way, e.g. `type StringOrNum = string|number`. Type aliases support union types and allow to type objects as well, by typing each of the properties of the object. E.g.:
- **Interfaces** can also be used to type objects with their properties. They can also be extended to define larger interfaces in terms of smaller ones (e.g. `Point3D extends Points2D`).

An example follows:

```typescript
interface Point {
  x: number,
  y: number,
}

const distance: (p1: Point, p2: Point) => number
  = (p1, p2) => {
    const dx: number = p2.x - p1.x
    const dy: number = p2.y - p1.y
    return Math.sqrt(dx * dx + dy * dy)
}

const p1: Point = {x: 2, y: 3}
const p2: Point = {x: 2, y: 3}

console.log(distance(p1, c2))
```

Notice how:
- changing some of the types of properties will lead to type errors.
- some of the type annotations can be removed, and the type errors would still be detected.


As mentioned earlier, a type with the same structure would also work, which is not what you might expect:

```typescript
type Coordinate = {x: number, y: number}

const c2: Coordinate = {x: 3, y: 5}

console.log(distance(p1, c2))
```

To make the types work as they would in a nominal type systems, a "brand" property can be used:

```typescript

interface Point {
  _PointBrand: string,
  x: number,
  y: number,
}

interface Coordinate {
  _CoordBrand: string,
  x: number,
  y: number,
}
```

## Additional TS characteristics

- **Readonly properties**: Properties can be defined as `readonly` to avoid them being mutated in the future. Actually, React state and props are by default readonly. Note that the mechanism is not foolproof: someone that really wants to mutate the object can do so through aliasing.
- **Type assertions** can be used to `convert` a type to another (in Java, a cast). This can be useful when transitioning from JS to TS. 
- **Tuples** a fixed size array can be used as a tuple, even if Javascript does not support such a construct. `type PointTuple = [number, number]`.
- **Enums** can be defined in Typescript (although union types of literals can cover some of the use cases). 
- **Functions** can be extensively typed: the arguments can be typed, some can be declared optional, some can have default values. The arguments can be destructured and still typed succesfully. A function may have several type overloads if it accepts several combinations of arguments.
- **Literal types**. Some variables can be typed as literals (e.g. `x` may only accept as value a specific string). 
- **Type checking literals**. Sometimes, the type checking for literals is more strict than for variable. For instance, suppose a function `foo` that expects an object of type `{x: number, y: number}`. Calling it with a literal with properties `{x, y, z}` will be an error. Passing the same object in a variable will not be an error. The reason for that is that it is almost always a programmer error when a literal is passed in this way: the programmer usually expects that all properties in a literal object will be used (else why define them?).

## Type guards

**Type guards**. Testing for the type of an object (with `typeof`) or a property (with `in`) will be used by the type inference engine to track the type of variables.

```typescript
interface A {
  x: number
}

interface B {
  y: string
}

type AorB = A | B

const foo: (aorb: AorB) => string | number
  = aorb => {
  if ('x' in aorb) {
    // we are 100% sure aorb is of type A in this branch
    return aorb.x
  }
  else {
    // we are 100% sure aorb is of type B in this branch
    return aorb.y
  }
}
```

**User defined type guards**. These are functions that have as a return type a type predicate `arg is type`. After executing those, typescript can also discriminate on the type of the object.

**Type guards and callbacks**. the type guards do not persist in callbacks, as arbitrary code could have been executed in between. Except if the value is stored in a variable  that is guaranteed not to change, then the type guard can persist even in the callback

## Type Inference
TS can infer the type of variables in a variety of ways:
- through assignment: the var must be of the type of the first assignment it had
- return type of functions is inferred by type of return statement
- from function type, the type of the function parameters can be inferred
- object properties can be inferred from the assignment to the properties
- typed object properties can be used to infer types when there is a destructuring assignment
- type gards propagate type information as well

Note that there are some limits: a poorly typed library can make typescript loose track of type annotations, as the functions in that library would return `any`

The `noImplicitAny`flag makes it more obvious when a function returns any, as TS complains. The type must be explicitely added.

## Resources on TypeScript

To present Typescript in details, the best is to consult the ample resources available online. 

The first is the official Typescript website:
- [Website](https://www.typescriptlang.org/index.html): overall website for Typescript
- [Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html): a few guidelines and common mistakes.
- [Frequently Asked Questions](https://github.com/Microsoft/TypeScript/wiki/FAQ): Frequently asked questions about Typescript, that can clarify some misconceptions.
- [Typescript playground](http://www.typescriptlang.org/play/#code): try out typescript without installing it.
- [Typescript in five minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html): A five-minutes high-level overview. 
- [Typescript and React](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html): tutorial on Typescript and how it works with React.

Other resources:
- [A nice tutorial](https://www.valentinog.com/blog/typescript/): this one is a bit longer than the "official" one, and cover a few more basic Typescript concepts.
- [Typescript Deep Dive](https://basarat.gitbooks.io/typescript/): **a very complete (and free!) book**.




# TypeScript with React

React, React Native, and Expo come with very good Typescript support. In fact, creating an Expo project in Typescript simply involves picking the "typescript" options when using `expo init`. React components also have type definitions, and the JSX syntax is supported.

## Function Components

The React and JSX type definition provide the `React.FunctionComponent<Props>`interface, where `<Props>` is a generic, and corresponds to the type alias or interface of the props that the component accepts. The Props is a Javascript object, so each property of this object would be an argument of the JSX call.

```typescript
interface NamedPoint {
  x: number,
  y: number,
  name?: string //optional prop
}

const PointComponent: React.FunctionComponent<NamedPoint> 
  = props => {
    return (
      <View>
        <Text>X is {props.x}</Text>
        <Text>Y is {props.y}</Text>
        <Text>Name is {props.name}</Text>
      </View>
    )
  }

//OK
<PointComponent x={2} y={3} name="my point"/> 

//Still OK, name optional
<PointComponent x={2} y={3} /> 

// Error, incompatible types
<PointComponent x="2" y={3} /> 
```

## Class Components 

Class components can be typechecked with the `React.Component<Props,State>` interface, where `<Props>` and `<State>` are two generic interfaces, similar to the example above.


## Renderable objects

The React.ReactNode interface defines everything that can be rendered in a component (it is the return type of React.Component or React.FunctionComponent).

## React.ReactElement<T>

If you store React elements in variables, you can use this type to ensure something is a ReactElement, and that it matches type <T>

## React.Component<T>

This is a type that accepts Props, and matches both FunctionComponent and ClassComponent.

## Generic components

The props of a component can also accept generic arguments. In some cases, there can be some ambiguity between generics and JSX syntax. 

```typescript
const foo = <T>(x: T) => x // breaks
const foo1 = <T extends {}>(x: T) => x //workaround

function foo2<T>(x: T): T { return x} 

// declaring types first works best
const foo3: <T>(x: T) => T
    = x => x
```

## Default props
Function components can be easily typed with default value for props. Class components are more complex.




