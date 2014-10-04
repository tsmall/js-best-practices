"use strict";

let Movies = window.Movies;
let Random = window.Random;
let Rx = window.Rx;

let RxFRP = {

    getCategories: () => {
        return Rx.Observable.
            fromArray(Movies.categories).
            delay(Random.milliseconds());
    },

    getMoviesInCategory: (category) => {
        return Rx.Observable.
            fromArray(Movies.getMoviesInCategory(category)).
            delay(Random.milliseconds());
    }

};

let RxExamples = [
    {
        title: "Get Movies (RxFRP)",
        run: (logger) => {
            let obs = RxFRP.getCategories().flatMap(category => {
                return RxFRP.getMoviesInCategory(category).map(movie => {
                    return [category, movie];
                });
            });

            obs.subscribe(kvp => logger(kvp[0] + ' - ' + kvp[1]));
        }
    },
    {
        title: "Get Movies with Indicator (RxFRP)",
        run: (logger) => {
            logger("Started loading...");

            let obs = RxFRP.getCategories().flatMap(category => {
                return RxFRP.getMoviesInCategory(category).map(movie => {
                    return [category, movie];
                });
            });

            obs.subscribe(
                kvp => logger(kvp[0] + ' - ' + kvp[1]),
                null,
                () => logger("Loading finished.")
            );
        }
    },
    {
        title: "Get Movies with Timeout (RxFRP)",
        run: (logger) => {
            logger("Started loading...");

            let obs = RxFRP.getCategories().flatMap(category => {
                return RxFRP.getMoviesInCategory(category).
                    map(movie => [category, movie]).
                    takeUntil(Rx.Observable.timer(500)).
                    defaultIfEmpty([category, 'Timed out!']);
            });

            obs.subscribe(
                kvp => logger(kvp[0] + ' - ' + kvp[1]),
                null,
                () => logger("Loading finished.")
            );
        }
    }
];
