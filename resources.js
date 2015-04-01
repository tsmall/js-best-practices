"use strict";

let Resources = {

    getPromiseResources: () => [
        {text: "q", href: "http://documentup.com/kriskowal/q/"},
        {text: "JavaScript Promises: There and back again", href: "http://www.html5rocks.com/en/tutorials/es6/promises/"}
    ],

    getFRPResources: () => [
        {text: "RxJS", href: "https://github.com/Reactive-Extensions/RxJS"},
        {text: "Bacon.js", href: "http://baconjs.github.io/"},
        {text: "Reactive Programming at Netflix", href: "http://techblog.netflix.com/2013/01/reactive-programming-at-netflix.html"},
        {text: "Learn Rx", href: "http://jhusain.github.io/learnrx/index.html"},
        {text: "Reactive Programming in the Netflix API with RxJava", href: "http://techblog.netflix.com/2013/02/rxjava-netflix-api.html"},
        {text: "Reactive Game Development For The Discerning Hipster", href: "https://www.youtube.com/watch?v=x8mmAu7ZR9Y"},
        {text: "The Introduction to Reactive Programming you've been missing", href: "https://gist.github.com/staltz/868e7e9bc2a7b8c1f754"}
    ],

    getCSPResources: () => [
        {text: "js-csp", href: "https://github.com/jlongster/js-csp"},
        {text: "Communicating Sequential Processes", href: "http://swannodette.github.io/2013/07/12/communicating-sequential-processes/"},
        {text: "CSP is Responsive Design", href: "http://swannodette.github.io/2013/07/31/extracting-processes"},
        {text: "Comparative Literate Programming", href: "http://swannodette.github.io/2013/08/17/comparative"},
        {text: "Taming the Asynchronous Beast with CSP Channels in JavaScript", href: "http://jlongster.com/Taming-the-Asynchronous-Beast-with-CSP-in-JavaScript"},
        {text: "Golang Docs", href: "http://golang.org/doc/"}
    ],

    linkify: resource => {
        return ['<a href="', resource.href, '">', resource.text, '</a>'].join('');
    }

};

let ResourceExamples = [
    {
        title: "Resources",
        run: (logger) => {
            logger("RESOURCES");

            logger("");

            logger("Promises:");
            Resources.getPromiseResources().
                map(Resources.linkify).
                forEach(link => logger("- " + link));

            logger("");

            logger("Rx / FRP:");
            Resources.getFRPResources().
                map(Resources.linkify).
                forEach(link => logger("- " + link));

            logger("");

            logger("CSP:");
            Resources.getCSPResources().
                map(Resources.linkify).
                forEach(link => logger("- " + link));
        }
    }
];
