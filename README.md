# Async Coding Styles in JavaScript

Asynchronous programming isn't anything new.  It's been in our
operating system calls and UI logic for a long time.  But many
programs were able to be primarily written in a synchronous coding
style.  Now, with the prevalence of JavaScript, more and more code is
being written in an asynchronous style.  Unfortunately, most
programmers' toolboxes only contained one tool for asynchrony:
callbacks.  That has lead to code that is hard to read and hard to
maintain.

Luckily, there are better tools available.  Some are new, and some are
old.  This repository contains examples for exploring asynchronous
programming in four styles:

* Plain callbacks (for comparison)
* Futures / promises via [q][]
* Functional Reactive Programming (FRP) via [Bacon.js][]
* Communicating Sequential Processes (CSP) via [js-csp][]


[bacon.js]: http://baconjs.github.io
[js-csp]: https://github.com/jlongster/js-csp
[q]: http://documentup.com/kriskowal/q/
