"use strict";

let Movies = window.Movies;

let FP = {
    containsA: (str) => str.toLowerCase().indexOf('a') !== -1,

    getMoviesInCategory: (category) => {
        let movies = [];
        if (category === "Action") movies = Movies.actionMovies;
        if (category === "Drama") movies = Movies.dramaMovies;
        if (category === "Horror") movies = Movies.horrorMovies;
        return movies;
    },

    flatten: nestedArray => {
        return nestedArray.reduce(
            (result, arr) => result.concat(arr),
            []
        );
    },

    flatMap: (array, fn) => FP.flatten(array.map(fn))
};

let FPExamples = [
    {
        title: "Filter",
        run: (logger) => {
            let aCategories = Movies.categories.filter(FP.containsA);
            logger("Original: " + JSON.stringify(Movies.categories));
            logger("Filtered: " + JSON.stringify(aCategories));
        }
    },
    {
        title: "Map",
        run: (logger) => {
            let upperCased = Movies.categories.map(String.toUpperCase);
            logger("Original: " + JSON.stringify(Movies.categories));
            logger("Mapped:   " + JSON.stringify(upperCased));
        }
    },
    {
        title: "Reduce",
        run: (logger) => {
            let favorites = [
                {category: 'Action', numFavs: 5},
                {category: 'Drama', numFavs: 18},
                {category: 'Horror', numFavs: 19}
            ];

            let totalFavs = favorites.reduce((total, each) => {
                return total + each.numFavs;
            }, 0);

            logger("Total Number of Favorites: " + totalFavs);
        }
    },
    {
        title: "FlatMap (Part 1)",
        run: (logger) => {
            let movies = Movies.categories.map(FP.getMoviesInCategory);
            logger("Movies: " + JSON.stringify(movies));
        }
    },
    {
        title: "FlatMap (Part 2)",
        run: (logger) => {
            let movies = FP.flatMap(Movies.categories, FP.getMoviesInCategory);
            logger("Movies: " + JSON.stringify(movies));
        }
    }
];
