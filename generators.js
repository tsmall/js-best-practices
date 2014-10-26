"use strict";

let GenHelp = {};

let GenExamples = [
    {
        title: "Generators (Part 1)",
        run: (logger) => {
            let gen = function*() {
                yield 'A';
                yield 'Z';
            };

            let g = gen();
            logger(JSON.stringify(g.next()));
            logger(JSON.stringify(g.next()));
            logger(JSON.stringify(g.next()));
        }
    },
    {
        title: "Generators (Part 2)",
        run: (logger) => {
            let gen = function*() {
                let num = yield null;
                return num + 1;
            };

            let g = gen();
            g.next();  // "Prime" the generator.
            logger(JSON.stringify(g.next(41)));
        }
    }
];
