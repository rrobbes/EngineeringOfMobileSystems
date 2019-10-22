const jscards = [{
front:
`What type of language is JavaScript?`
,
back:
`It is a scripting language.`
},{
front:
`JavaScript is a scripting language. What is a scripting language?`
,
back:
`A scripting language is a lightweight programming language.`
},{
front:
`What would be the result of the following code?
<script>
document.write("<h1>This is a heading</h1>");
document.write("<p>This is a paragraph.</p>");
</script>`
,
back:
`It will write what is between the <h1> and <p> tags to the browser screen formated accordingly to the respective HTML tags`
},{
front:
`What happens is you use:
document.write
After the document has loaded?`
,
back:
`The whole document will be overwritten. Only use in the HTML output.`
},{
front:
`The alert() function is not much used in JavaScript, however it is useful for...?`
,
back:
`It is often quite handy for trying out code.`
},{
front:
`What will this code do?
<p id="demo">
JavaScript can change the content of an HTML element.
</p>
<script>
function myFunction()
{
x=document.getElementById("demo"); // Find the element
x.innerHTML="Hello JavaScript!"; // Change the content
}
</script>`
,
back:
`It will change the text between the <p> tags to the content in quotes after x.innerHTML
Hello JavaScript!`
},{
front:
`This piece of code tells the computer to do what?
x=document.getElementById("demo");`
,
back:
`Find the Element
("demo");
document.getElementById("some id")
The "Id" could be anything else.`
},{
front:
`This piece of code tells the computer to do what?
x.innerHTML="Hello JavaScript!";`
,
back:
`Change the content of the x variable to Hello JavaScript!`
},{
front:
`What does the following code do?

On_Off_LightBulb`
,
back:
`Sets up an " if else " condition to where if the user clicks on the image it will change to the alternate image and vice versa...`
},{
front:
`What does the following code do?
Validate_Input`
,
back:
`Creates a text entry field with the id="demo" which is called upon by getElementById and then sets up a " if " condition where if the input is not numeric it will trigger the alert("Not Numeric") notification.`
},{
front:
`What is the difference between JavaScript and Java ?`
,
back:
`They are two completely different languages, in both concept and design.
Java (invented by Sun) is a more complex programming language in the same category as C.`
},{
front:
`What is the official name of the JavaScript standard ?`
,
back:
`ECMA-262`
},{
front:
`Who invented JavaScript ?`
,
back:
`Brendan Eich`
},{
front:
`In what year and what browser did JavaScript first appear ?`
,
back:
`1995`
},{
front:
`In what year did the ECMA (a standard association) adopt JavaScript ?`
,
back:
`1997`
},{
front:
`Who is the ECMA ?`
,
back:
`European Computer Manufacturers Association
now the ECMA International`
},{
front:
`In an HTML document JavaScript must be placed between which tag ?`
,
back:
`<script>
JavaScript
</script>`
},{
front:
`In what section of an HTML document can JavaScript be placed ?`
,
back:
`The <head> or the <body> sections.`
},{
front:
`JavaScript can be placed in which part(s) of an HTML document ?`
,
back:
`The <head> or the <body> section.`
},{
front:
`It is common practice to place all JavaScript where in an HTML document ?`
,
back:
`All in the <head>section or at the end of the <body> section, this way it is all in one place and does not interfere with the page content.`
},{
front:
`Example of JavaScript in the <head>
What does the following code do ?
Change_Text`
,
back:
`When the button is clicked it executes the myFunction() script that is in the <head> of the document. This script getElementByID("demo") and changes the text from <p id="demo"> "A Paragraph" to "My First JavaScript Function"`
},{
front:
`Example of JavaScript in the <body>
What does the following code do ?
Change_Text_001`
,
back:
`When the button is clicked it executes the myFunction() script that is in the <body> of the document. This script getElementByID("demo") and changes the text from <p id="demo"> "A Paragraph" to "My First JavaScript Function"`
},{
front:
`What does the following code do?
<!DOCTYPE html>
<html>
<body>
<script src="myScript.js"></script>
</body>
</html>`
,
back:
`Links the "myScript.js" JavaScript file to the HTML document. Example of an External JavaScript file.`
},{
front:
`Is there something wrong with this file named:
myScript.js
<script>
function myFunction()
{
document.getElementById("demo").innerHTML="My First JavaScript Function";
}
</script>`
,
back:
`External scripts cannot contain <script> tags.`
},{
front:
`What is JavaScript typically used for in regard to HTML documents ?`
,
back:
`To manipulate HTML elements.`
},{
front:
`How do you access an HTML element from JavaScript
and what attribute do you use in the HTML?`
,
back:
`To use the document.getElementById("id") method.
Use the id=" " attribute to identify the HTML element:`
},{
front:
`What does the following code do ?
Change_Text_003`
,
back:
`The JavaScript is executed by the web browser. In this case, the browser will access the HTML element with id="demo", and replace its content with innerHTML with "My First JavaScript".`
},{
front:
`JavaScript is a sequence of __________ to be executed by the browser.`
,
back:
`statements`
},{
front:
`JavaScript statements are ________ to the browser.`
,
back:
`commands`
},{
front:
`What does this JavaScript statement tell the browser to do?
Change_Text_004`
,
back:
`Tells the browser to write "Hello Dolly" inside an HTML element with id="demo"`
},{
front:
`What is at the end of all JavaScript statements to separate each one from the next?`
,
back:
`A semicolon ;`
},{
front:
`Is the semicolon at the end of each statement necessary?`
,
back:
`No, it is optional`
},{
front:
`JavaScript statements are grouped together in ______.`
,
back:
`blocks`
},{
front:
`Blocks of JavaScript start and end with what?`
,
back:
`Start with a left curly bracket and end with a right curly bracket.
Ex.
{
statement;
statement;
}`
},{
front:
`What is the purpose of grouping JavaScript statements together in blocks?`
,
back:
`So that they execute together.`
},{
front:
`Is JavaScript case sensitive?`
,
back:
`Yes
Ex.
getElementById is not the same as getElementbyId (the first one is correct)`
},{
front:
`Which one is correct:
var name="Hege";
var name = "Hege";`
,
back:
`Both... JavaScript ignores extra spaces. You can add white space to your script to make it more readable.`
},{
front:
`You can break up a code line within a text string using what?`
,
back:
`A backslash \
Ex.
document.write("Hello \
World!");`
},{
front:
`What is the difference in how a scripting language (JavaScript) is executed verses how a traditional programming language is executed?`
,
back:
`Scripting code is executed line by line while the browser reads it. With traditional programming, all the code has to be compiled before it can be executed.`
},{
front:
`How do you insert a single line comment in JavaScript?`
,
back:
`Two forward slashes
Ex.
// This is a single line comment
// This is another one`
},{
front:
`How do you insert a multi-line comment in JavaScript?`
,
back:
`Comment starts with a forward slash and an asterisk and ends with an asterisk and a forward slash.
Ex.
/* This is an example of a multi-line comment as it should be formated in JavaScript code. */`
},{
front:
`Why would you use comments to prevent certian lines of code or statements from being executed?`
,
back:
`Can be useful for debugging.`
},{
front:
`This is an example of doing what?
variables`
,
back:
`Setting variables.`
},{
front:
`Think of variables as __________ for storing data.`
,
back:
`containers`
},{
front:
`True or False
Variable can have shortVariable can have short names (like x and y) or more descriptive names (age, sum, totalvolume).`
,
back:
`True`
},{
front:
`True or False
Variable names can begin with a letter or a number.`
,
back:
`False
Variable names must begin with a letter.`
},{
front:
`Besides a letter, variable names can begin with what two symbols`
,
back:
`Variable names can also begin with $ and _`
},{
front:
`Are JavaScript variables case sensitive?`
,
back:
`Yes
Variable names are case sensitive (y and Y are different variables)`
},{
front:
`Besides numbers JavaScript variable can also hold ________.`
,
back:
`Other types of data, like text values (name="John Doe").`
},{
front:
`In JavaScript a text variable like "John Doe" is called a ______.`
,
back:
`string`
},{
front:
`When you assign a text value to a variable what do you put around it?`
,
back:
`Single or double quotation marks.
Ex.
var name='john doe'
OR
var name2="jane doe"`
},{
front:
`Creating a variable in JavaScript is most often referred to as _________ a variable.`
,
back:
`declaring`
},{
front:
`What keyword do you use in JavaScript to declare a variable?`
,
back:
`The var keyword.
Ex.
var name="john doe";`
},{
front:
`What is the case if you declare a variable with no value?
Ex.
var carname;`
,
back:
`The variable is empty`
},{
front:
`It's a good programming practice to declare all the variables where?`
,
back:
`All in one place at the beginning of your code.`
},{
front:
`You can declare multiple variables in one statement separated by what?`
,
back:
`A comma
Ex.
var name="Doe", age=30, job="carpenter";
OR Multi-line
var name="Doe",
age=30,
job="carpenter";`
},{
front:
`Variables declared without a value will have the value _________.`
,
back:
`undefined`
},{
front:
`Undefined or empty variables may receive a value later by what means.`
,
back:
`The result of a calculation or user input.`
},{
front:
`What will happen if you re-declare a variable?
Ex.
var carname="Volvo"; 
var carname;`
,
back:
`The variable will still retain the value "Volvo"`
},{
front:
`What do you use to perform arithmetic with variables?`
,
back:
`Operators like + , - , =`
},{
front:
`JavaScript has dynamic data types. What does this mean?`
,
back:
`Means that the same variable can be used as different types.
Ex.

var x // Now x is undefined
var x = 5; // Now x is a Number
var x = "John"; // Now x is a String`
},{
front:
`Name 7 JavaScript data types.`
,
back:
`number, string, boolean, array, object, null, undefined`
},{
front:
`What is a JavaScript string?`
,
back:
`A variable which stores a series of characters like "John Doe".`
},{
front:
`Can you use quotes inside a string?`
,
back:
`Yes, as long as they don't match the quotes surrounding the string.
Ex.
var answer="It's alright";
var answer="He is called 'Johnny'";
var answer='He is called "Johnny"';`
},{
front:
`What is a good way to write extra large or small numbers in JavaScript variables.`
,
back:
`Using scientific (exponential) notation.
Ex.
var y=123e5; // 12300000
var z=123e-5; // 0.00123`
},{
front:
`What are the only two values that a boolean can have?`
,
back:
`true or false`
},{
front:
`Booleans are often used for what?`
,
back:
`Conditional testing.`
},{
front:
`What is a JavaScript array?`
,
back:
`A list of values for a variable.
Ex.
var cars=new Array();
cars[0]="Saab";
cars[1]="Volvo";
cars[2]="BMW";
OR a condensed array
var cars=new Array("Saab","Volvo","BMW");
OR a literal array
var cars=["Saab","Volvo","BMW"];`
},{
front:
`An array index in numbered in what manner?`
,
back:
`They are zero based, meaning that the first item is [0], the second [1], and so on.`
},{
front:
`How is a JavaScript object delimited?`
,
back:
`With curly braces.
Ex.
var person={firstname:"John", lastname:"Doe", id:5566};`
},{
front:
`Inside the curly braces the objects properties are defined as ____ and _____.`
,
back:
`( name : value )`
},{
front:
`The properties in an object are separated by what?`
,
back:
`A comma.
Ex.
var person={firstname:"John", lastname:"Doe", id:5566};

OR

var person={
firstname : "John",
lastname : "Doe",
id : 5566
};`
},{
front:
`What are 2 way you can address an object?`
,
back:
`name=person.lastname;
name=person["lastname"];`
},{
front:
`Variables can be emptied by setting the value to what?`
,
back:
`null
Ex.
cars=null;
person=null;`
},{
front:
`When you declare a new variable you can declare its type by using what keyword?`
,
back:
`The "new" keyword.
Ex.
var carname=new String;
var x= new Number;
var y= new Boolean;
var cars= new Array;
var person= new Object;`
},{
front:
`JavaScript variables are all _______.`
,
back:
`objects
When you declare a variable you create a new object.`
},{
front:
`In JavaScript, an object is data, with __________ and _______.`
,
back:
`properties and methods`
},{
front:
`Give an example of object properties.`
,
back:
`car.name=Fiat
car.model=500
car.weight=850kg
car.color=white`
},{
front:
`Give an example of object methods.`
,
back:
`car.start()
car.drive()
car.brake()`
},{
front:
`Properties are ______ associated with an object.`
,
back:
`values`
},{
front:
`Methods are _______ that can be performed on an object.`
,
back:
`actions`
},{
front:
`In object oriented languages, properties and methods are often called ______ _______.`
,
back:
`object members`
},{
front:
`Almost everything in JavaScript is a ______.`
,
back:
`object
Strings, Dates, Arrays, Functions`
},{
front:
`What is this example doing?
person=new Object();
person.firstname="John";
person.lastname="Doe";
person.age=50;
person.eyecolor="blue";`
,
back:
`Creating a new object named "person" and assigning 4 properties to it.`
},{
front:
`What is the syntax for accessing the property of an object?`
,
back:
`objectName.propertyName`
},{
front:
`What will the value of x be after the execution of this code:
var message="Hello World!";
var x=message.length;`
,
back:
`12`
},{
front:
`What is the syntax for calling a method on an object?`
,
back:
`objectName.methodName()`
},{
front:
`What will be the result of executing the following code?
var message="Hello world!";
var x=message.toUpperCase();`
,
back:
`HELLO WORLD!`
},{
front:
`It is common in object oriented languages to use _____ ____ function names. Give example.`
,
back:
`camel-case
someMethod() instead of some_method()`
},{
front:
`What is a JavaScript function?`
,
back:
`A block of code that will be executed when "someone" calls on it.
function`
},{
front:
`A function is written as a code block inside what and preceeded by what.`
,
back:
`curly braces { } and preceeded by the function keyword
Ex.
function functionname()
{
some code to be executed
}`
},{
front:
`A function can be called directly when an event occurs such as.`
,
back:
`A user clicks a button.`
},{
front:
`A function can be called from where in JavaScript code?`
,
back:
`Anywhere`
},{
front:
`When you call a function, you can pass along some values to it, these values are called _________ or __________.`
,
back:
`arguments or parameters`
},{
front:
`How many arguments can you assign to a function?`
,
back:
`You can send as many arguments as you like, separated by commas (,)
Ex.
myFunction(argument1,argument2)`
},{
front:
`The variables and arguments must be in ________ order.`
,
back:
`expected
function_001`
},{
front:
`What will the following code do?
function_001`
,
back:
`It will alert "Welcome Harry Potter, the Wizard" when the button is clicked.`
},{
front:
`What would the following JavaScript do when run ?
Ex.
"Example".length`
,
back:
`Give an output of ' 7 '
In other words the characters in the string would be counted (including spaces) and provide a numerical output.`
},{
front:
`What would be the output of this example ?
"Example two".length * 2`
,
back:
`22`
},{
front:
`What will this example do ?
confirm("This Example");`
,
back:
`It will bring up a ' confirmation ' box with the words ' This Example" with the option buttons of Ok or Cancel.`
},{
front:
`What will this example do ?
prompt("What is your name?");`
,
back:
`It will bring up a box asking the question ' What is your name? ' and provide a text entry field for the user to answer in.`
},{
front:
`Name three common data types.`
,
back:
`Numbers
Strings
Booleans`
},{
front:
`What are the only two possible values for booleans ?`
,
back:
`True or False`
},{
front:
`Who is the boolean data type named after ?`
,
back:
`George Boole`
},{
front:
`What does console.log() do ?`
,
back:
`It will take whatever is inside the parentheses and log it to the console below your code.

This is commonly called printing out.`
},{
front:
`Name 5 comparison operators.`
,
back:
`> Greater than
< Less than
<= Less than or equal to
>= Greater than or equal to
=== Equal to`
},{
front:
`What is an if statement or a conditional statement ?`
,
back:
`The usage of comparisons plus booleans to decide whether a block of code should run.`
},{
front:
`What is the basic syntax of a function in JavaScript ?`
,
back:
`function_syntax`
},{
front:
`What does D.R.Y. stand for in programming ?`
,
back:
`Don't Repeat Yourself`
},{
front:
`Any time you find yourself typing the same thing, but modifying only one small part, you can probably use what?`
,
back:
`A function`
},{
front:
`Can functions have more than one parameter ?`
,
back:
`Yes
Ex.
function_2_parameters`
},{
front:
`What is the basic syntax of a for loop ?`
,
back:
`for_loop`
},{
front:
`Name two ways to increment a number up by "1"`
,
back:
`Provided the variable is i
i + 1
i++`
},{
front:
`Name two ways to decrement a number by "1"`
,
back:
`Provided the variable is i
i - 1
i--`
},{
front:
`What is the syntax for incrementing or decrementing by any numerical value ?`
,
back:
`Provided i is the variable and x is the numerical level of increment or decrement.
i += x
i -= x`
},{
front:
`What is the basic syntax of an array ?`
,
back:
`array
Note the square brackets [ ]`
},{
front:
`What does Math.random() do in JavaScript ?`
,
back:
`The computer chooses a random number between 0 and 1
Ex.
0.0138295739957
0.9845837659374`
},{
front:
`What is a while loop ideal for ?`
,
back:
`When you want to use a loop, but you don't know how many times you'll have to execute that loop.`
},{
front:
`What is the basic syntax of a while loop ?`
,
back:
`while(condition){  // Do something! }`
},{
front:
`What do you put at the end of a long string to wrap to the next line ?`
,
back:
`a backslash ' \ '
Ex.
text ="This is a long string in the code \
editor with a backslash at the \
end of each line that wraps";`
},{
front:
`What does /*jshint multistr:true */ do ?`
,
back:
`It tells the console to stop worrying about our use of backslash characters for wrapping long lines of text.`
},{
front:
`What is a for loop ideal for ?`
,
back:
`Doing the same task over and over when you know ahead of time how many times you'll have to repeat the loop.`
},{
front:
`What is a ' do ' / ' while ' loop used for ?`
,
back:
`When you want to make sure your loop runs at least one time no matter what. When this is the case, you want a modified while loop called ado/while loop.`
},{
front:
`While loops will continue so long as ?`
,
back:
`The loop will continue so long as the condition being evaluated is true.`
},{
front:
`What is the basic syntax of a do / while loop?`
,
back:
`var condition = false; do {  console.log("I'm printed once!"); } while(condition);`
},{
front:
`The switch statement allows you to present a number of options called _____ ? then check an expression to see if it matches any of them. If there's a match, the program will perform the action for the matching case; if there's no match, it can execute a default option.`
,
back:
`case(s)`
},{
front:
`What is the basic syntax of a switch statement ?`
,
back:
`switch`
},{
front:
`Name the 6 comparison operators.`
,
back:
`=== (equals)
!== (not equal)
> (greater than)
>= (greater than or equal to)
< (less than)
<= (less than or equal to)`
},{
front:
`Name the 3 Boolean logical operators and define each.`
,
back:
`&& (Logical AND, returns true if both expression1 and expression2 are true. Otherwise it returns false).
|| (Logical OR, returns true if expression3 or expression4 are true, or both are true. Otherwise it returns false).
! (Logical negation, returns the boolean that is the opposite of expression5).`
},{
front:
`What is a heterogeneous array ?`
,
back:
`An array with a mixture of data types.
Ex.
var mix = [42, true, "towel"];`
},{
front:
`What is a two-dimensional array ?`
,
back:
`One or more arrays nested inside an array.
Ex.
var twoDimensional = [[1, 1], [1, 1]];`
},{
front:
`What is an object ?`
,
back:
`Combinations of key-value pairs (like arrays), only their keys don't have to be numbers like 0, 1, or 2: they can be strings and variables.`
},{
front:
`What is the basic syntax of creating an object using object literal notation ?`
,
back:
`var myObj = {  type: 'fancy',  disposition: 'sunny' }; var emptyObj = {};`
},{
front:
`What is the basic syntax of creating an object using object constructor ?`
,
back:
`var myObj = new Object();
You can add keys to your object after you've created it in two ways:

myObj["name"] = "Charlie";
 myObj.name = "Charlie";`
},{
front:
`What are the two ways of creating an object ?`
,
back:
`object literal notation
and
object constructor`
},{
front:
`What is the basic syntax of a for / in loop ?`
,
back:
`for (var something in object) {  // Do something }`
}]

const frenchCards = [
  {front: 'Lundi', back: 'Monday'},
  {front: 'Mardi', back: 'Tuesday'},
  {front: 'Mercredi', back: 'Wednesday'},
  {front: 'Jeudi', back: 'Thursday'},
  {front: 'Vendredi', back: 'Friday'},
  {front: 'Samedi', back: 'Saturday'},
  {front: 'Dimanche', back: 'Sunday'},
]

const fac = x => x?x * fac(x - 1):1

const factorials = [...Array(20).keys()].map(x => ({front: `The factorial of ${x} is:`, back: `${fac(x)}`}))

const decks = [
     {name: 'Basic Javascript', cards: jscards},
     {name: 'Advanced French', cards: frenchCards},
     {name: 'Genius-level math', cards: factorials},
]

export default decks

