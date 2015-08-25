"use strict";

let IntroHelpers = {

    getGoals: function() {
        return [
            "Describe common pitfalls",
            "Describe how to avoid them",
            "Talk about ES6"
        ];
    },

    getNonGoals: function() {
        return [
            "Handling asynchronous code",
            "Code organization and design",
            "React, Flux, Angular, etc."
        ];
    },

    listify: function(item) {
        return `• ${item}`;
    }

};

let IntroExamples = [
    {
        title: "Goals",
        run: (logger) => {
            logger("GOALS");
            IntroHelpers.getGoals().
                map(IntroHelpers.listify).
                forEach(logger);
        }
    },
    {
        title: "Non-Goals",
        run: (logger) => {
            logger("NON-GOALS");
            IntroHelpers.getNonGoals().
                map(IntroHelpers.listify).
                forEach(logger);
        }
    }
];

Registrar.register({
    title: 'Introduction',
    helpers: IntroHelpers,
    helpersName: 'IntroHelpers',
    examples: IntroExamples
});
