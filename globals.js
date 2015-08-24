"use strict";


let GlobalHelpers = {
};

let GlobalExamples = [
    {
        title: "Example Data",
        run: (logger) => {
            logger("Hello world.");
        }
    }
];

Registrar.register({
    title: 'Implicit Global Variables',
    helpers: GlobalHelpers,
    helpersName: 'GlobalHelpers',
    examples: GlobalExamples
});
