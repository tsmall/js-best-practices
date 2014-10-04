"use strict";

let Movies = window.Movies;
let Random = window.Random;
let csp = require('csp');

let CSP = {

    getCategories: () => {
        let out = csp.chan();
        csp.go(function*() {
            yield csp.take(csp.timeout(Random.milliseconds()));

            for (let category of Movies.categories) {
                yield csp.put(out, category);
            }
            out.close();
        });
        return out;
    },

    getMoviesInCategory: (category) => {
        let out = csp.chan();
        csp.go(function*() {
            yield csp.take(csp.timeout(Random.milliseconds()));

            let movies = Movies.getMoviesInCategory(category);
            for (let movie of movies) {
                yield csp.put(out, movie);
            }
            out.close();
        });
        return out;
    },

    flatMapFrom: (f, ch) => {
        let out = csp.chan();
        csp.go(function*() {
            let val, doneChs = [];
            while ((val = yield csp.take(ch)) !== csp.CLOSED) {
                let mapCh = f(val);
                let done = csp.chan();
                doneChs.push(done);
                csp.go(function*() {
                    let mapChVal;
                    while ((mapChVal = yield csp.take(mapCh)) !== csp.CLOSED) {
                        yield csp.put(out, mapChVal);
                    }
                    done.close();
                });
            }

            let allDone = csp.operations.merge(doneChs);
            while ((yield csp.take(allDone)) !== csp.CLOSED) {}
            out.close();
        });
        return out;
    }

};

let CSPExamples = [
    {
        title: "Get Movies (CSP)",
        run: (logger) => {
            csp.go(function*() {
                let categoryChan = CSP.getCategories();
                while (true) {
                    let category = yield csp.take(categoryChan);
                    if (category === csp.CLOSED) break;

                    csp.go(function*() {
                        let movieChan = CSP.getMoviesInCategory(category);
                        while (true) {
                            let movie = yield csp.take(movieChan);
                            if (movie === csp.CLOSED) break;

                            logger(category + ' - ' + movie);
                        }
                    });
                }
            });
        }
    },
    {
        title: "Get Movies with Indicator (CSP)",
        run: (logger) => {
            csp.go(function*() {
                logger("Starting loading...");

                let categoryChan = CSP.getCategories();
                let movieOutChans = [];
                while (true) {
                    let category = yield csp.take(categoryChan);
                    if (category === csp.CLOSED) break;

                    let out = csp.chan();
                    movieOutChans.push(out);
                    csp.go(function*() {
                        let movieChan = CSP.getMoviesInCategory(category);
                        while (true) {
                            let movie = yield csp.take(movieChan);
                            if (movie === csp.CLOSED) break;

                            let movieInfo = {category: category, movie: movie};
                            yield csp.put(out, movieInfo);
                        }
                        out.close();
                    });
                }

                let movieChan = csp.operations.merge(movieOutChans);
                while (true) {
                    let movieInfo = yield csp.take(movieChan);
                    if (movieInfo === csp.CLOSED) break;

                    logger(movieInfo.category + ' - ' + movieInfo.movie);
                }

                logger("Loading finished.");
            });
        }
    },
    {
        title: "Get Movies with Indicator (FRP style CSP)",
        run: (logger) => {
            csp.go(function*() {
                logger("Started loading...");

                let movieChan = CSP.flatMapFrom(
                    category => {
                        return csp.operations.mapFrom(
                            movie => [category, movie],
                            CSP.getMoviesInCategory(category)
                        );
                    },
                    CSP.getCategories()
                );

                while (true) {
                    let kvp = yield csp.take(movieChan);
                    if (kvp === csp.CLOSED) break;

                    logger(kvp[0] + ' - ' + kvp[1]);
                }

                logger("Loading finished.");
            });
        }
    }
];
