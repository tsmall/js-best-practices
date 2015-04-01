(function() {

    let el = selector => document.querySelector(selector);

    el('#start').addEventListener('click', event => {
        el('#splash-container').style.display = 'none';
        el('main').style.display = 'block';
    });

}());
