let Movies = {
    categories: ["Action", "Drama", "Horror"],
    actionMovies: ["300", "Sin City"],
    dramaMovies: ["Eyes Wide Shut", "Saving Private Ryan"],
    horrorMovies: ["The Ring", "The Conjuring"]
};

let Example = {

    load: function(example) {
        let title = this._getElement('h1');
        title.innerHTML = example.title;

        let codePre = this._getElement('.code');
        codePre.contentEditable = true;
        codePre.spellcheck = false;
        codePre.innerHTML = this._fnToString(example.run);

        let outPre = this._getElement('.output');
        let logger = this.log.bind(null, outPre);
        let clearOutput = this.clear.bind(null, outPre);
        clearOutput();

        let getFn = this._evalCode.bind(this, codePre);
        let button = this._getElement('button');
        button.onclick = () => {
            clearOutput();
            getFn()(logger);
        };
    },

    _evalCode: function(codePre) {
        let source = codePre.innerHTML.replace(/&gt;/g, '>');
        return eval(source);
    },

    _getElement: function(selector) {
        return document.querySelector(['.example', selector].join(' '));
    },

    _fnToString: function(fn) {
        return fn.
            toString().
            split('\n').
            map(line => line.startsWith(' ') ? line.substring(12) : line).
            join('\n');
    },

    clear: function(outputElement) {
        outputElement.innerHTML = '';
    },

    log: function(outputElement, text) {
        outputElement.innerHTML = outputElement.innerHTML + text + '<br>';
    }

};
