let Movies = {
    categories: ["Action", "Drama", "Horror"],
    actionMovies: ["300", "Sin City"],
    dramaMovies: ["Eyes Wide Shut", "Saving Private Ryan"],
    horrorMovies: ["The Ring", "The Conjuring"]
};

let Example = {

    load: function(helpers, example) {
        let title = this._getElement('h1');
        title.innerHTML = example.title;

        let helpersPre = this._getElement('.code-helpers');
        helpersPre.contentEditable = true;
        helpersPre.spellcheck = false;
        helpersPre.innerHTML = this._objToString(helpers);

        let examplePre = this._getElement('.code-example');
        examplePre.contentEditable = true;
        examplePre.spellcheck = false;
        examplePre.innerHTML = this._fnToString(example.run, 8);

        let outPre = this._getElement('.output');
        let logger = this.log.bind(null, outPre);
        let clearOutput = this.clear.bind(null, outPre);
        clearOutput();

        let evalHelpers = this._evalCode.bind(this, helpersPre);
        let evalExample = this._evalCode.bind(this, examplePre);
        let button = this._getElement('button');
        button.onclick = () => {
            clearOutput();
            evalHelpers();
            evalExample()(logger);
        };
    },

    _evalCode: function(codePre) {
        let code = codePre.innerHTML.replace(/&gt;/g, '>').replace(/<br>/g, '\n');
        return eval(code);
    },

    _getElement: function(selector) {
        return document.querySelector(['.example', selector].join(' '));
    },

    _fnToString: function(fn, extraLeadingSpaces) {
        return fn.
            toString().
            split('\n').
            map(line => line.startsWith(' ') ? line.substring(extraLeadingSpaces) : line).
            join('\n');
    },

    _objToString: function(obj) {
        let objName = this._getObjName(obj);
        let source = [];
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                source.push(objName + '.' + prop + ' = ' + this._fnToString(obj[prop], 4));
                source.push('');
            }
        }
        return source.join('\n');
    },

    _getObjName: function(obj) {
        if (obj === window.FRP) {
            return 'FRP';
        }
        else if (obj === window.CSP) {
            return 'CSP';
        }
        else {
            throw new Error("Unknown obj: " + obj);
        }
    },

    clear: function(outputElement) {
        outputElement.innerHTML = '';
    },

    log: function(outputElement, text) {
        outputElement.innerHTML = outputElement.innerHTML + text + '<br>';
    }

};
