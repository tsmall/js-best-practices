"use strict";

var Movies = window.Movies;
var Q = window.Q;
var Random = window.Random;

let Promises = {

    callbackAdd: (x, y, callback) => {
        window.setTimeout(
            () => callback(x + y),
            Random.milliseconds()
        );
    },

    promiseAdd: (x, y) => Q.Promise((resolve, reject, notify) => {
        window.setTimeout(
            () => resolve(x + y),
            Random.milliseconds()
        );
    }),

    getCategories: () => Q.Promise((resolve, reject, notify) => {
        window.setTimeout(
            () => resolve(Movies.categories),
            Random.milliseconds()
        );
    }),

    getMoviesInCategory: (category) => Q.Promise((resolve, reject, notify) => {
        window.setTimeout(() => {
            let movies = Movies.getMoviesInCategory(category);
            resolve(movies);
        }, Random.milliseconds());
    })

};

let PromiseExamples = [
    {
        title: "Intro to Promises",
        run: (logger) => {
            Promises.callbackAdd(1, 1, result => {
                logger("1 + 1 = " + result);
            });

            let promisedResult = Promises.promiseAdd(1, 1);
            promisedResult.then(result => {
                logger("1 + 1 = " + result);
            });
        }
    },
    {
        title: "Get Movies (Promises)",
        run: (logger) => {
            Promises.getCategories().then(categories => {
                categories.forEach(category => {
                    Promises.getMoviesInCategory(category).then(movies => {
                        movies.forEach(movie => {
                            logger(category + ' - ' + movie);
                        });
                    });
                });
            });
        }
    },
    {
        title: "Get Movies with Indicator (Promises)",
        run: (logger) => {
            logger("Started loading...");

            Promises.getCategories().then(categories => {
                let moviePromises = categories.map(category => {
                    return Promises.getMoviesInCategory(category).then(movies => {
                        movies.forEach(movie => {
                            logger(category + ' - ' + movie);
                        });
                    });
                });

                Q.all(moviePromises).then(() => logger("Loading finished."));
            });
        }
    },
    {
        title: "Get Movies with Timeout (Promises)",
        run: (logger) => {
            logger("Started loading...");

            Promises.getCategories().then(categories => {
                let moviePromises = categories.map(category => {
                    return Promises.
                        getMoviesInCategory(category).
                        timeout(500).
                        then(movies => {
                            movies.forEach(movie => {
                                logger(category + ' - ' + movie);
                            });
                        }).
                        fail(error => {
                            logger(category + ' - Timed out!');
                        });
                });

                Q.all(moviePromises).then(() => logger("Loading finished."));
            });
        }
    }
];
