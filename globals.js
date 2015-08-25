let GlobalHelpers = {
    getPeople: () => [
        {
            name: 'John Doe',
            siblings: ['Jack', 'Jane']
        },
        {
            name: 'Jack Doe',
            siblings: ['John', 'Jane']
        }
    ],

    getFix: () => '"use strict";'
};

let GlobalExamples = [
    {
        title: "Implicit Globals (Bad)",
        run: (logger) => {
            function describePeople(people) {
                for (i = 0; i < people.length; i++) {
                    describePerson(people[i]);
                }
            }

            function describePerson(person) {
                var description = [person.name, 'is related to'];
                var siblings = [];
                for (i = 0; i < person.siblings.length; i++) {
                    siblings.push(person.siblings[i]);
                }
                description.push(siblings.join(', '));
                logger(description.join(' '));
            }

            describePeople(GlobalHelpers.getPeople());
        }
    },
    {
        title: "Implicit Globals (Better)",
        run: (logger) => {
            function describePeople(people) {
                var i;
                for (i = 0; i < people.length; i++) {
                    describePerson(people[i]);
                }
            }

            function describePerson(person) {
                var description = [person.name, 'is related to'];
                var siblings = [];
                var i;
                for (i = 0; i < person.siblings.length; i++) {
                    siblings.push(person.siblings[i]);
                }
                description.push(siblings.join(', '));
                logger(description.join(' '));
            }

            describePeople(GlobalHelpers.getPeople());
        }
    
    },
    {
        title: "Implicit Globals (Best)",
        run: (logger) => {
            logger(GlobalHelpers.getFix());
        }
    
    }
];

Registrar.register({
    title: 'Implicit Global Variables',
    helpers: GlobalHelpers,
    helpersName: 'GlobalHelpers',
    examples: GlobalExamples
});
