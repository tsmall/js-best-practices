"use strict";

let Bacon = window.Bacon;
let Example = window.Example;
let Movies = window.Movies;
let Random = window.Random;

let FRP = {

    getCategories: () => {
        return Bacon.
            fromArray(Movies.categories).
            delay(Random.milliseconds());
    },

    getMoviesInCategory: (category) => {
        return Bacon.
            fromArray(Movies.getMoviesInCategory(category)).
            delay(Random.milliseconds());
    }

};

let FRPExamples = [
    {
        title: "Get Movies (FRP)",
        run: (logger) => {
            FRP.getCategories().onValue(category => {
                FRP.getMoviesInCategory(category).onValue(movie => {
                    logger(category + ' - ' + movie);
                });
            });
        }
    },
    {
        title: "Get Movies with Indicator (FRP)",
        run: (logger) => {
            logger("Started loading...");

            let movieStream = FRP.getCategories().flatMap(category => {
                return FRP.getMoviesInCategory(category).map(movie => {
                    return [category, movie];
                });
            });

            movieStream.onValue(kvp => logger(kvp[0] + ' - ' + kvp[1]));
            movieStream.onEnd(() => logger("Loading finished."));
        }
    },
    {
        title: "Get Movies with Timeout (FRP)",
        run: (logger) => {
            logger("Started loading...");

            let movieStream = FRP.getCategories().flatMap(category => {
                return FRP.getMoviesInCategory(category).
                    takeUntil(Bacon.later(500, null)).
                    map(movie => [category, movie]);
            });

            // TODO: Log when the timeout happens.

            movieStream.onValue(kvp => logger(kvp[0] + ' - ' + kvp[1]));
            movieStream.onEnd(() => logger("Loading finished."));
        }
    }
];
