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
        title: "Arrays: Find 'A' Names (filter)",
        run: (logger) => {
            const people = ['john', 'jack', 'jane'];
            const aNames = people.filter(name => name.includes('a'));
            logger(aNames);
        }
    },
    {
        title: "Arrays: Join (for...of)",
        run: (logger) => {
            const people = ['john', 'jack', 'jane'];
            let allNames = '';
            for (let name of people) {
                allNames += `${name} `;
            }
            logger(allNames);
        }
    },
    {
        title: "Arrays: Join (reduce)",
        run: (logger) => {
            const people = ['john', 'jack', 'jane'];
            const allNames = people.reduce(
                (result, name) => result + `${name} `,
                ''
            );
            logger(allNames);
        }
    },
    {
        title: "Maps: for...of (keys)",
        run: (logger) => {
            const ages = new Map([
               ['John', 21],
               ['Jane', 22],
               ['Jack', 23]
            ]);
            
            for (let key of ages.keys()) {
                logger(key);
            }
        }
    },
    {
        title: "Maps: for...of (values)",
        run: (logger) => {
            const ages = new Map([
               ['John', 21],
               ['Jane', 22],
               ['Jack', 23]
            ]);
            
            for (let value of ages.values()) {
                logger(value);
            }
        }
    },
    {
        title: "Maps: for...of (entries)",
        run: (logger) => {
            const ages = new Map([
               ['John', 21],
               ['Jane', 22],
               ['Jack', 23]
            ]);
            
            for (let entry of ages.entries()) {
                logger(`${entry[0]}: ${entry[1]}`);
            }
        }
    }
];

Registrar.register({
    title: 'Looping',
    helpers: LoopHelpers,
    helpersName: 'LoopHelpers',
    examples: LoopExamples
});
