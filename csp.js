let Movies = window.Movies;
let csp = require('csp');

let CSP = {

    getCategories: () => {
        let out = csp.chan();
        csp.go(function*() {
            for (let category of Movies.categories) {
                yield csp.take(csp.timeout(500));
                yield csp.put(out, category);
            }
            out.close();
        });
        return out;
    },

    getMoviesInCategory: (category) => {
        let out = csp.chan();
        csp.go(function*() {
            let movies = Movies.getMoviesInCategory(category);
            for (let movie of movies) {
                yield csp.take(csp.timeout(1000));
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
                while (!categoryChan.closed) {
                    let category = yield csp.take(categoryChan);
                    csp.go(function*() {
                        let movieChan = CSP.getMoviesInCategory(category);
                        while (!movieChan.closed) {
                            let movie = yield csp.take(movieChan);
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
                while (!categoryChan.closed) {
                    let category = yield csp.take(categoryChan);
                    let out = csp.chan();
                    movieOutChans.push(out);
                    csp.go(function*() {
                        let movieChan = CSP.getMoviesInCategory(category);
                        while (!movieChan.closed) {
                            let movie = yield csp.take(movieChan);
                            let movieInfo = {category: category, movie: movie};
                            yield csp.put(out, movieInfo);
                        }
                        out.close();
                    });
                }

                let movieChan = csp.operations.merge(movieOutChans);
                let movieInfo;
                while ((movieInfo = yield csp.take(movieChan)) !== csp.CLOSED) {
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

                let kvp;
                while ((kvp = yield csp.take(movieChan)) !== csp.CLOSED) {
                    logger(kvp[0] + ' - ' + kvp[1]);
                }

                logger("Loading finished.");
            });
        }
    }
];
