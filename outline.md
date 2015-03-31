# Presentation Outline

## Explain why we have to handle async code

- JavaScript is single-threaded
- Often want to do things at the same time (concurrency and parallelism)

## Give an overview of techniques

Techniques I'm covering:

- Callbacks
- Promises
- FRP and Rx
- CSP

Others:

- Threads (WebWorkers)
- Actors

## Set expectations

- I'm focusing on general techniques, not specific examples for us

## Introduce ES6 features I'm using

- "Fat arrow" functions
- Let statements

## Describe data and problem

- Get all movies in all categories
- Requires multiple requests: one for categories, one for movies in category
- Want to display data as soon as we have it
- Will build up features from there

## Callbacks


