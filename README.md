# Mars Rover

Many thanks to Thoughtworks for giving me the opportunity to attempt this tech test.
To run the app, first make sure you have npm and Node.js installed, then run `npm install` in this repo to install the 
dependencies, followed by `npm run start`.
The `npm run test` command will run the tests.

## Approach
- I decided to write my solution in [TypeScript](https://www.typescriptlang.org/), a superset of JavaScript that allows 
developers to add static types to their JavaScript code.
- I used the Test-Driven Development technique to build the app, writing my tests with the [mocha](https://mochajs.org/)
 framework and [chai](https://www.chaijs.com/) assertion library.
- To make things simpler I adopted the [ts-mocha](https://www.npmjs.com/package/ts-mocha) wrapper, which allows 
developers to run TypeScript tests (via [ts-node](https://github.com/TypeStrong/ts-node)) without the need for a 
compilation step.
- I have endeavoured to embody Object-Oriented Programming best practices in my code, beginning by developing the Rover 
class and creating new classes and interfaces as and when the single responsibility principle seemed to dictate it.
- The rules allow you to use any mechanism for feeding input into your solution. I decided to implement a basic command
 line interface using the Node.js [readline](https://nodejs.org/api/readline.html) API, which I extended slightly in 
 order to use async/await syntax.
- I have tried to follow the principles of clean code, and to make my code self-documenting (except in the case of the
 readline extension, which I thought justified a comment).

