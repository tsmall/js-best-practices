"use strict";

let Movies = window.Movies;
let Random = window.Random;

let Callbacks = {

    getCategories: (callback) => window.setTimeout(
        () => callback(Movies.categories),
        Random.milliseconds()
    ),

    getMoviesInCategory: (category, callback) => {
        window.setTimeout(() => {
            let movies = Movies.getMoviesInCategory(category);
            callback(movies);
        }, Random.milliseconds());
    }

};

let CallbackExamples = [
    {
        title: "Get Movies (Callbacks)",
        run: (logger) => {
            Callbacks.getCategories(categories => {
                categories.forEach(category => {
                    Callbacks.getMoviesInCategory(category, movies => {
                        movies.forEach(movie => {
                            logger(category + ' - ' + movie);
                        });
                    });
                });
            });
        }
    },
    {
        title: "Get Movies with Indicator (Callbacks)",
        run: (logger) => {
            logger("Started loading...");

            Callbacks.getCategories(categories => {
                let numRequestsRemaining = categories.length;
                categories.forEach(category => {
                    Callbacks.getMoviesInCategory(category, movies => {
                        movies.forEach(movie => {
                            logger(category + ' - ' + movie);
                        });

                        numRequestsRemaining--;
                        if (numRequestsRemaining === 0) {
                            logger("Loading finished.");
                        }
                    });
                });
            });
        }
    },
    {
        title: "Get Movies with Timeout (Callbacks)",
        run: (logger) => {
            logger("Started loading...");

            Callbacks.getCategories(categories => {
                let numRequestsRemaining = categories.length;
                categories.forEach(category => {
                    // Wait up to 0.5 seconds for the response.
                    let timedOut = false;
                    window.setTimeout(() => timedOut = true, 500);

                    Callbacks.getMoviesInCategory(category, movies => {
                        if (timedOut) {
                            logger(category + ' - Timed out!');
                        }
                        else {
                            movies.forEach(movie => {
                                logger(category + ' - ' + movie);
                            });
                        }

                        numRequestsRemaining--;
                        if (numRequestsRemaining === 0) {
                            logger("Loading finished.");
                        }
                    });
                });
            });
        }
    }
];
