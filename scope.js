"use strict";

let ScopeHelpers = {

    getPerson: function() {
        return {
            role: 'Worker',
            supervisor: {
                role: 'Manager'
            }
        };
    },

    getBuilding: function(role) {
        return role === 'Manager' ? 'Office' : null;
    },

    getPeople: function() {
        return [
            {name: 'John Doe', role: 'Worker'},
            {name: 'Jane Doe', role: 'Manager'}
        ];
    }

};

let ScopeExamples = [
    {
        title: 'Variable Scope (Bad)',
        run: (logger) => {
            function describeRole(person) {
                var role = person.role;
                var building = ScopeHelpers.getBuilding(role);

                if (!building) {
                    var supervisor = person.supervisor;
                    var role = supervisor.role;
                    building = ScopeHelpers.getBuilding(role);
                }

                logger(`Role: ${role}`);
                logger(`Building: ${building}`);
            }

            describeRole(ScopeHelpers.getPerson());
        }
    },
    {
        title: 'Variable Scope (Good)',
        run: (logger) => {
            function describeRole(person) {
                let role = person.role;
                let building = ScopeHelpers.getBuilding(role);

                if (!building) {
                    let supervisor = person.supervisor;
                    let role = supervisor.role;
                    building = ScopeHelpers.getBuilding(role);
                }

                logger(`Role: ${role}`);
                logger(`Building: ${building}`);
            }

            describeRole(ScopeHelpers.getPerson());
        }
    },
    {
        title: 'Variable Scope (Better)',
        run: (logger) => {
            function describeRole(person) {
                const role = person.role;
                let building = ScopeHelpers.getBuilding(role);

                if (!building) {
                    const supervisor = person.supervisor;
                    const role = supervisor.role;
                    building = ScopeHelpers.getBuilding(role);
                }

                logger(`Role: ${role}`);
                logger(`Building: ${building}`);
            }

            describeRole(ScopeHelpers.getPerson());
        }
    },
    {
        title: 'Function Scope (Bad)',
        run: (logger) => {
            function describePeople(people) {
                function print(person) {
                    logger(`Name: ${person.name}`);
                }
                people.forEach(print);

                function print(person) {
                    logger(`Role: ${person.role}`);
                }
                people.forEach(print);
            }

            describePeople(ScopeHelpers.getPeople());
        }
    },
    {
        title: 'Function Scope (OK)',
        run: (logger) => {
            function describePeople(people) {
                var print = (person) => logger(`Name: ${person.name}`);
                people.forEach(print);

                print = (person) => logger(`Role: ${person.role}`);
                people.forEach(print);
            }

            describePeople(ScopeHelpers.getPeople());
        }
    }
];

Registrar.register({
    title: 'Scope',
    helpers: ScopeHelpers,
    helpersName: 'ScopeHelpers',
    examples: ScopeExamples
});
