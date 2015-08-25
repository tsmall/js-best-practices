let CollectionsHelpers = {

    logSet: function(logger, set) {
        if (set instanceof Set) {
            this.logRealSet(logger, set);
        }
        else {
            this.logFakeSet(logger, set);
        }
    },

    logFakeSet: function(logger, fakeSet) {
        var values = [];
        for (var key in fakeSet) {
            if (fakeSet.hasOwnProperty(key)) {
                values.push(this.render(key));
            }
        }
        logger('{' + values.join(',') + '}');
    },

    logRealSet: function(logger, set) {
        var values = [];
        set.forEach(each => values.push(this.render(each)));
        logger('{' + values.join(',') + '}');
    },

    render: function(stringOrPerson) {
        if (stringOrPerson.name !== undefined) {
            return 'Person("' + stringOrPerson.name + '")';
        }
        else {
            return stringOrPerson;
        }
    }

};

let CollectionsExamples = [
    {
        title: 'Arrays: Gaps',
        run: (logger) => {
            var myArray = [0, 1, 2];
            myArray[10] = 10;
            logger('[' + myArray + ']');
        }
    },
    {
        title: 'Arrays: Modifying the Length',
        run: (logger) => {
            var myArray = [0, 1, 2];
            myArray.length = 1;
            logger('[' + myArray + ']');
        }
    },
    {
        title: 'Objects: Like Maps',
        run: (logger) => {
            var fakeDict = {
                first: 'John',
                last: 'Doe'
            };
            logger("First Name: " + fakeDict['first']);
            logger("Last Name: " + fakeDict['last']);
        }
    },
    {
        title: 'Objects: Non-String Keys',
        run: (logger) => {
            function Person(name) {
                this.name = name;
            }

            var john = new Person('John Doe');
            var jack = new Person('Jack Doe');

            var fakeDict = {
                [john]: john.name,
                [jack]: jack.name
            };

            logger("john: " + fakeDict[john]);
            logger("jack: " + fakeDict[jack]);
        }
    },
    {
        title: 'Maps',
        run: (logger) => {
            function Person(name) {
                this.name = name;
            }

            var john = new Person('John Doe');
            var jack = new Person('Jack Doe');

            var fakeDict = new Map([
                [john, john.name],
                [jack, jack.name]
            ]);

            logger("john: " + fakeDict.get(john));
            logger("jack: " + fakeDict.get(jack));
        }
    },
    {
        title: 'Objects: Fake Sets',
        run: (logger) => {
            var fakeSet = {
                john: null,
                jack: null
            };

            // Add an entry
            fakeSet['jane'] = null;

            // Add a duplicate
            fakeSet['john'] = null;

            CollectionsHelpers.logSet(logger, fakeSet);

            // Test for membership
            if (fakeSet['john'] !== undefined) {
                logger('"john" is in the set');
            }
            if (fakeSet['jess'] !== undefined) {
                logger('"jess" is in the set');
            }
        }
    },
    {
        title: 'Objects: Sets of Objects',
        run: (logger) => {
            function Person(name) {
                this.name = name;
            }

            var john = new Person('John Doe');
            var jack = new Person('Jack Doe');
            var jane = new Person('Jane Doe');
            var jess = new Person('Jane Doe');

            var fakeSet = {
                [john]: null,
                [jack]: null
            };

            // Add an entry
            fakeSet[jane] = null;

            // Add a duplicate
            fakeSet[john] = null;

            CollectionsHelpers.logSet(logger, fakeSet);

            // Test for membership
            if (fakeSet[john] !== undefined) {
                logger('"john" is in the set');
            }
            if (fakeSet[jess] !== undefined) {
                logger('"jess" is in the set');
            }
        }
    },
    {
        title: 'Sets: Real Sets',
        run: (logger) => {
            function Person(name) {
                this.name = name;
            }

            var john = new Person('John Doe');
            var jack = new Person('Jack Doe');
            var jane = new Person('Jane Doe');
            var jess = new Person('Jane Doe');

            var set = new Set([john, jack]);

            // Add an entry
            set.add(jane);

            // Add a duplicate
            set.add(john);

            CollectionsHelpers.logSet(logger, set);

            // Test for membership
            if (set.has(john)) {
                logger('"john" is in the set');
            }
            if (set.has(jess)) {
                logger('"jess" is in the set');
            }
        }
    }
];

Registrar.register({
    title: 'Collections',
    helpers: CollectionsHelpers,
    helpersName: 'CollectionsHelpers',
    examples: CollectionsExamples
});
