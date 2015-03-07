"use strict";

let Movies = window.Movies;

let Intro = {
};

let IntroExamples = [
    {
        title: "Example Data",
        run: (logger) => {
            logger(JSON.stringify(Movies, undefined, 4));
        }
    }
];
