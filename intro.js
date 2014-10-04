let Movies = window.Movies;

let Intro = {
};

let IntroExamples = [
    {
        title: "Arrow Functions (Part 1)",
        run: (logger) => {
            var oldAndBusted = function() {
                return ":(";
            };

            var newHotness = () => ":)";

            logger(oldAndBusted());
            logger(newHotness());
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
    },
    {
        title: "Example Data",
        run: (logger) => {
            logger(JSON.stringify(Movies, undefined, 4));
        }
    }
];