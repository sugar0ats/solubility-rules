class Ion {
    constructor(name, charge, rule) {
        this.name = name; // a string
        this.charge = charge; // an array of integers, positive or negative
        this.isCation = (charge[0] > 0 ? true : false);
        this.rule = rule; // an integer, which rule the ion pertains to
    }

    getName() {
        return this.name;
    }

    getCharge() {
        return this.charge;
    }

    getIsCation() {
        return this.isCation;
    }

    getRule() {
        return this.rule;
    }
}

const PeriodicTable = [
    ['H', 'Li', 'Na', 'K', 'Rb', 'Cs'], // each array is a column, minus the transition metals
                       ['Be', 'Mg', 'Ca', 'Sr', 'Ba'], 
                       //['Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ag', 'Cd', 'Pt', 'Au', 'Hg'], 
                       ['Al'], // transition metals
                       [], // where C would be
                       ['N', 'P'], // beginning of nonmetals
                       ['O', 'S'],
                       ['F', 'Cl', 'Br', 'I'],
                       ['Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ag', 'Cd', 'Pt', 'Au', 'Hg'], 

];

let FinalTable = [];
PeriodicTable.map((subArray, index) => {
    let charge;
    let chargeCoefficient;
    if (index === PeriodicTable.length - 1) { // for transition metals
        chargeCoefficient = 1;
        charge = 2; // TEMPORARY
        
    } else if (index > 2) {
        chargeCoefficient = -1;
        charge = PeriodicTable.length - index - 1;

    } else {
        chargeCoefficient = 1;
        charge = index + 1;
    }
    
    const newArr = subArray.map((element) => {
        //console.log(new Ion(element, chargeCoefficient * charge, null));
        charge = (element === 'Ag' ? 1 : charge);
        return new Ion(element, [chargeCoefficient * charge], null)}
    );
    
    FinalTable.push(newArr);
});

FinalTable.push([
    new Ion('NH4', [1], 1),
    new Ion('CH3COO', [-1], 2),
    new Ion('CrO4', [-2], 5),
    new Ion('NO3', [-1], 2),
    new Ion('ClO4', [-1], 2), // DOUBLE CHECK THIS
    new Ion('PO4', [-3], 5),
    new Ion('CO3', [-2], 5),
    new Ion('OH', [-1], 5),
    new Ion('SO4', [-2], 6),
]);

// accounting for polyatomic atoms

export default FinalTable;