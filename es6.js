"use strict";

let ES6Intro = {
};

let ES6IntroExamples = [
    {
        title: "Arrow Functions (Part 1)",
        run: (logger) => {
            var oldAndBusted = function() {
                return ":(";
            };

            var newHotness = () => ":)";

            logger("The old way makes me " + oldAndBusted());
            logger("The new way makes me " + newHotness());
        }
    },
    {
        title: "Arrow Functions (Part 2)",
        run: (logger) => {
            var ex1 = (name) => "Hi, " + name + ".";
            var ex2 = name   => "Hi, " + name + ".";
            var ex3 = (fname, lname) => {
                return ["Hi, ", fname, " ", lname, "."].join('');
            };

            logger(ex1('John'));
            logger(ex2('Jane'));
            logger(ex3('John', 'Doe'));
        }
    },
    {
        title: "Arrow Functions (Part 3)",
        run: (logger) => {
            var ExampleObject = {
                normalFn: function() {
                    logger("normalFn this: " + this);
                },
                
                arrowFn: () => {
                    logger("arrowFn this: " + this);
                }
            };
            
            window.setTimeout(ExampleObject.normalFn, 0);
            window.setTimeout(ExampleObject.arrowFn, 0);
        }
    },
    {
        title: "Let Statement (Part 1)",
        run: (logger) => {
            if (true) {
                var i = 42;
            }

            try {
                logger(i);
            }
            catch (ex) {
                logger(ex);
            }
        }
    },
    {
        title: "Let Statement (Part 2)",
        run: (logger) => {
            if (true) {
                let i = 42;
            }

            try {
                logger(i);
            }
            catch (ex) {
                logger(ex);
            }
        }
    }
];
