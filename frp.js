"use strict";

let Bacon = window.Bacon;
let Example = window.Example;
let Movies = window.Movies;
let Random = window.Random;

let FRP = {

    getCategories: () => {
        let bus = new Bacon.Bus();
        window.setTimeout(
            () => {
                bus.plug(Bacon.fromArray(Movies.categories));
                bus.end();
            },
            Random.milliseconds()
        );
        return bus;
    },

    getMoviesInCategory: (category) => {
        let bus = new Bacon.Bus();
        window.setTimeout(
            () => {
                let movies = Movies.getMoviesInCategory(category);
                bus.plug(Bacon.fromArray(movies));
                bus.end();
            },
            Random.milliseconds()
        );
        return bus;
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
