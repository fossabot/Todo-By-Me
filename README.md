# Todo By Me

Server-side implementation of cross-platform *Todo By Me* application. Backend is written in TypeScript running on Node.js,
and implements Firebase SDK for managing authentication, database and data storage.

Because this project ignores compiled TypeScript, you need to perform compilation yourself. I have put together a concise
`tsconfig.json` file as well as building rules in `package.json`, simplifying compilation to

    ~$ npm start
    
I am using Jest for tests, you can run them with

    ~$ npm test

This project is being developed on Node.js version `10.15.3`.
