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
        title: "Get Movies (Rx)",
        run: (logger) => {
            RxFRP.getCategories().subscribe(category => {
                RxFRP.getMoviesInCategory(category).subscribe(movie => {
                    logger(category + " - " + movie);
                });
            });
        }
    },
    {
        title: "Get Movies, Rx-style (Rx)",
        run: (logger) => {
            let movieStream = RxFRP.getCategories().flatMap(category => {
                return RxFRP.getMoviesInCategory(category).map(movie => {
                    return {
                        category: category,
                        name: movie
                    };
                });
            });

            movieStream.subscribe(movie => {
                logger(movie.category + ' - ' + movie.name);
            });
        }
    },
    {
        title: "Get Movies with Indicator (Rx)",
        run: (logger) => {
            logger("Started loading...");

            let movieStream = RxFRP.getCategories().flatMap(category => {
                return RxFRP.getMoviesInCategory(category).map(movie => {
                    return {
                        category: category,
                        name: movie
                    };
                });
            });

            movieStream.subscribe(
                movie => logger(movie.category + ' - ' + movie.name),
                null,
                () => logger("Loading finished.")
            );
        }
    },
    {
        title: "Get Movies with Timeout (Rx)",
        run: (logger) => {
            logger("Started loading...");

            let movieStream = RxFRP.getCategories().flatMap(category => {
                return RxFRP.getMoviesInCategory(category).
                    map(movie => { return {category: category, name: movie} }).
                    takeUntil(Rx.Observable.timer(500)).
                    defaultIfEmpty({category: category, name: 'Timed out!'});
            });

            movieStream.subscribe(
                movie => logger(movie.category + ' - ' + movie.name),
                null,
                () => logger("Loading finished.")
            );
        }
    }
];
