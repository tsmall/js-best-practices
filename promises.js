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
            let movies = [];
            if (category === "Action") movies = Movies.actionMovies;
            if (category === "Drama") movies = Movies.dramaMovies;
            if (category === "Horror") movies = Movies.horrorMovies;
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
    }
];
