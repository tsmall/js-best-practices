"use strict";

let LoopHelpers = {};

let LoopExamples = [
    {
        title: "Arrays: for...in",
        run: (logger) => {
            const people = ['john', 'jack', 'jane'];
            // people.foo = 'bar';
            for (let each in people) {
                logger(each);
            }
        }
    },
    {
        title: "Arrays: for...of",
        run: (logger) => {
            const people = ['john', 'jack', 'jane'];
            // people.foo = 'bar';
            for (let each of people) {
                logger(each);
            }
        }
    },
    {
        title: "Arrays: forEach",
        run: (logger) => {
            const people = ['john', 'jack', 'jane'];
            people.forEach(each => logger(each));
            // people.forEach(logger);
        }
    },
    {
        title: "Arrays: Convert to Uppercase (for...of)",
        run: (logger) => {
            const people = ['john', 'jack', 'jane'];
            let lowercasePeople = [];
            for (let name of people) {
                lowercasePeople.push(name.toUpperCase());
            }
            logger(lowercasePeople);
        }
    },
    {
        title: "Arrays: Convert to Uppercase (map)",
        run: (logger) => {
            const people = ['john', 'jack', 'jane'];
            const lowercasePeople = people.map(name => name.toUpperCase());
            logger(lowercasePeople);
        }
    },
    {
        title: "Arrays: Find 'A' Names (for...of)",
        run: (logger) => {
            const people = ['john', 'jack', 'jane'];
            let aNames = [];
            for (let name of people) {
                if (name.includes('a')) {
                    aNames.push(name);
                }
            }
            logger(aNames);
        }
    },
    {
        title: "Arrays: Find 'A' Names (for...of)",
        run: (logger) => {
            const people = ['john', 'jack', 'jane'];
            const aNames = people.filter(name => name.includes('a'));
            logger(aNames);
        }
    }
];

Registrar.register({
    title: 'Looping',
    helpers: LoopHelpers,
    helpersName: 'LoopHelpers',
    examples: LoopExamples
});
