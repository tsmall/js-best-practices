"use strict";

let Resources = {

    getResources: () => [
        {text: "JavaScript: The Good Parts", href: "http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742"},
        {text: "ES6 Features", href: "https://github.com/lukehoban/es6features"}
    ],

    linkify: resource => {
        return `<a target="_none" href="${resource.href}">${resource.text}</a>`;
    },

    itemize: text => {
        return  `• ${text}`;
    }

};

let ResourceExamples = [
    {
        title: "Resources",
        run: (logger) => {
            logger("RESOURCES");

            logger("");

            Resources.getResources().
                map(Resources.linkify).
                map(Resources.itemize).
                forEach(logger);
        }
    }
];

Registrar.register({
    title: 'Resources',
    helpers: Resources,
    helpersName: 'Resources',
    examples: ResourceExamples
});
