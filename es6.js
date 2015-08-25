"use strict";

let ES6Helpers = {};

let ES6Examples = [
    {
        title: 'Classes: Constructor Function',
        run: (logger) => {
            function Person(name) {
                this.name = name;
            }

            Person.prototype.sayHi = function() {
                logger(`Hi. I'm ${this.name}.`);
            };

            const john = new Person('John Doe');
            john.sayHi();
        }
    },
    {
        title: 'Classes: New "class" Keyword',
        run: (logger) => {
            class Person {
                constructor(name) {
                    this.name = name;
                }

                sayHi() {
                    logger(`Hi. I'm ${this.name}.`);
                }
            }

            const john = new Person('John Doe');
            john.sayHi();
        }
    },
    {
        title: 'Destructuring: Arrays',
        run: (logger) => {
            const names = ['John', 'Jane', 'Jack'];
            const [j1, j2, j3] = names;
            logger(j1);
            logger(j2);
            logger(j3);
        }
    },
    {
        title: 'Destructuring: Objects',
        run: (logger) => {
            const john = {
                first: 'John',
                last: 'Doe'
            };

            const { first, last } = john;
            logger(first);
            logger(last);
        }
    },
    {
        title: 'Destructuring: Parameters',
        run: (logger) => {
            function describePerson({ first, last }) {
                logger(`First Name: ${first}`);
                logger(`Last Name: ${last}`);
            }

            describePerson({
                first: 'John',
                last: 'Doe'
            });
        }
    },
    {
        title: 'Modules: CommonJS (Single)',
        run: (logger) => {
            function getPerson(id) {
                // ...
            }

            module.exports = getPerson;

            // --------------------

            {
                const getPerson = require('/path/to/module');
                const person = getPerson(1);
            }
        }
    },
    {
        title: 'Modules: CommonJS (Multiple)',
        run: (logger) => {
            function getPerson(id) {
                // ...
            }

            function getDepartment(role) {
                // ...
            }

            module.exports = {
                getPerson: getPerson,
                getDepartment: getDepartment
            };

            // --------------------

            const Module = require('/path/to/module');
            const person = Module.getPerson(1);
            const department = Module.getDepartment(person.role);
        }
    },
    {
        title: 'Modules: ES6 (Single)',
        run: (logger) => {
            /*
            export default function getPerson(id) {
                // ...
            }

            // --------------------

            {
                import getPerson from '/path/to/module';
                const person = getPerson(1);
            }
            */
        }
    },
    {
        title: 'Modules: ES6 (Multiple)',
        run: (logger) => {
            /*
            export function getPerson(id) {
                // ...
            }

            export function getDepartment(role) {
                // ...
            }

            // --------------------

            import { getPerson, getDepartment } from '/path/to/module';
            const person = getPerson(1);
            const department = getDepartment(person.role);
            */
        }
    }
];

Registrar.register({
    title: 'Other ES6 Features',
    helpers: ES6Helpers,
    helpersName: 'ES6Helpers',
    examples: ES6Examples
});
