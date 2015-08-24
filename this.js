let ThisHelpers = {};

let ThisExamples = [
    {
        title: 'Incorrectly Bound "this"',
        run: (logger) => {
            var person = {
                name: 'John Doe',

                sayHi: function() {
                    logger("Hello. I'm " + this.name + ".");
                },

                sayHiLater: function(seconds) {
                    logger("Wait for it...");
                    window.setTimeout(this.sayHi, seconds * 1000);
                }
            };

            person.sayHi();
            // person.sayHiLater(1);
        }
    },
    {
        title: 'The "self" Pattern',
        run: (logger) => {
            var person = {
                name: 'John Doe',

                sayHi: function() {
                    logger("Hello. I'm " + this.name + ".");
                },

                sayHiLater: function(seconds) {
                    logger("Wait for it...");
                    var self = this;
                    window.setTimeout(function() {
                        self.sayHi();
                    }, seconds * 1000);
                }
            };

            person.sayHiLater(1);
        }
    },
    {
        title: 'The "bind" Method',
        run: (logger) => {
            var person = {
                name: 'John Doe',

                sayHi: function() {
                    logger("Hello. I'm " + this.name + ".");
                },

                sayHiLater: function(seconds) {
                    logger("Wait for it...");
                    window.setTimeout(this.sayHi.bind(this), seconds * 1000);
                }
            };

            person.sayHiLater(1);
        }
    },
    {
        title: 'Fat Arrows',
        run: (logger) => {
            var person = {
                name: 'John Doe',

                sayHi: function() {
                    logger("Hello. I'm " + this.name + ".");
                },

                sayHiLater: function(seconds) {
                    logger("Wait for it...");
                    window.setTimeout(() => this.sayHi(), seconds * 1000);
                }
            };

            person.sayHiLater(1);
        }
    }
];

Registrar.register({
    title: 'Incorrectly Bound "this"',
    helpers: ThisHelpers,
    helpersName: 'ThisHelpers',
    examples: ThisExamples
});
