"use strict";

let Bacon = window.Bacon;
let Example = window.Example;
let Movies = window.Movies;

let FRP = {

    getCategories: () => Bacon.sequentially(500, Movies.categories),

    getMoviesInCategory: (category) => {
        let movies = Movies.getMoviesInCategory(category);
        return Bacon.sequentially(1000, movies);
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
            let movieStream = FRP.getCategories().
                flatMap(category => {
                    return FRP.getMoviesInCategory(category).map(movie => {
                        return [category, movie];
                    });
                });
            movieStream.onValue(kvp => logger(kvp[0] + ' - ' + kvp[1]));
            movieStream.onEnd(() => logger("Loading finished."));
        }
    }
];
