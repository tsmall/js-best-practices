"use strict";

var Movies = window.Movies;
var Q = window.Q;
var Random = window.Random;

let Promises = {

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
                    let moviePromise = Q.timeout(
                        Promises.getMoviesInCategory(category),
                        500
                    );
                    return moviePromise.
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
