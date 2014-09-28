let Bacon = window.Bacon;
let Example = window.Example;
let Movies = window.Movies;

let FRP = {

    getCategories: () => Bacon.sequentially(500, Movies.categories),

    getMoviesInCategory: (category) => {
        let movies = [];
        if (category === "Action") movies = Movies.actionMovies;
        if (category === "Drama") movies = Movies.dramaMovies;
        if (category === "Horror") movies = Movies.horrorMovies;
        return Bacon.sequentially(1000, movies);
    }

};

let FRPExamples = [
    {
        title: "Get All Movies (FRP)",
        run: (logger) => {
            FRP.getCategories().onValue(category => {
                FRP.getMoviesInCategory(category).onValue(movie => {
                    logger(category + ' - ' + movie);
                });
            });
        }
    },
    {
        title: "Another Example",
        run: (logger) => {
            logger("Just testing...");
        }
    }
];
