"use strict";

let csp       = require('csp');
let UISection = window.UISection;
let Random    = window.Random;
let Rx        = window.Rx;

let UI = {
    showButton: () => {
        UISection.show();

        let button = document.createElement('button');
        button.innerHTML = 'Click Me';
        UISection.addElement(button);
        return button;
    },

    chanFromEvent: (domElement, eventName) => {
        let outChan = csp.chan();

        domElement.addEventListener(eventName, event => {
            csp.putAsync(outChan, event, () => {});
        });
        
        return outChan;
    },

    makeNetworkRequest: callback => {
        window.setTimeout(callback, Random.milliseconds());
    },

    makeNetworkRequestRx: () => {
        return Rx.Observable.
            just("Result").
            delay(Random.milliseconds());
    }
};

let UIExamples = [
    {
        title: "Button Click (Callback)",
        run: (logger) => {
            let button = UI.showButton();

            button.addEventListener('click', event => {
                logger("Button clicked");
            });
        }
    },
    {
        title: "Button Click (Promise)",
        run: (logger) => {
            // Nothing to see here.
        }
    },
    {
        title: "Button Click (Rx)",
        run: (logger) => {
            let button = UI.showButton();

            let clicks = Rx.Observable.fromEvent(button, 'click');

            clicks.subscribe(event => logger("Button clicked"));
        }
    },
    {
        title: "Button Click (CSP)",
        run: (logger) => {
            let button = UI.showButton();

            let clickChan = UI.chanFromEvent(button, 'click');

            csp.go(function*() {
                while (true) {
                    let event = yield csp.take(clickChan);
                    if (event === csp.CLOSED) break;

                    logger("Button clicked");
                }                
            });
        }
    },
    {
        title: "Disabled Button (Callback)",
        run: (logger) => {
            let button = UI.showButton();

            button.addEventListener('click', event => {
                button.disabled = true;

                UI.makeNetworkRequest(result => {
                    logger("Result received.");
                    button.disabled = false;
                });
            });
        }
    },
    {
        title: "Disabled Button (Rx)",
        run: (logger) => {
            let button   = UI.showButton();
            let clicks   = Rx.Observable.fromEvent(button, 'click');
            let requests = clicks.flatMap(_ => UI.makeNetworkRequestRx()).publish().refCount();

            requests.subscribe(_ => logger("Result received."));

            let buttonState = clicks.
                merge(requests).
                scan(false, (acc, val) => !acc);
            buttonState.subscribe(state => button.disabled = state);
        }
    }
];
