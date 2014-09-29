let Movies = {
    categories: ["Action", "Drama", "Horror"],
    actionMovies: ["300", "Sin City"],
    dramaMovies: ["Eyes Wide Shut", "Saving Private Ryan"],
    horrorMovies: ["The Ring", "The Conjuring"]
};

let Example = {

    /**
     * createExampleLinks creates the sidebar links from the actual
     * example code, hooking them up so clicking on one will load that
     * example's code in the example runner.
     */
    createExampleLinks: function() {
        let exampleSections = [
            {title: 'FRP', helpers: window.FRP, examples: window.FRPExamples},
            {title: 'CSP', helpers: window.CSP, examples: window.CSPExamples}
        ];

        let containers = exampleSections.map(exampleGroup => {
            let section = document.createElement('div');

            let header = document.createElement('h2');
            header.innerHTML = exampleGroup.title;
            section.appendChild(header);

            let list = document.createElement('ul');
            exampleGroup.examples.
                map(ex => {
                    let link = document.createElement('a');
                    link.href = '#';
                    link.innerHTML = ex.title;
                    link.onclick = () => Example.load(exampleGroup.helpers, ex);

                    let li = document.createElement('li');
                    li.appendChild(link);
                    return li;
                }).
                forEach(li => list.appendChild(li));
            section.appendChild(list);
            return section;
        });

        let sidebar = document.querySelector('aside');
        containers.forEach(section => sidebar.appendChild(section));
    },

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
