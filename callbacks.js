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
                let numCategoriesRemaining = categories.length;
                categories.forEach(category => {
                    Callbacks.getMoviesInCategory(category, movies => {
                        movies.forEach(movie => {
                            logger(category + ' - ' + movie);
                        });

                        numCategoriesRemaining--;
                        if (numCategoriesRemaining === 0) {
                            logger("Loading finished.");
                        }
                    });
                });
            });
        }
    }
];
