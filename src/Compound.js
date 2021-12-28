// must always title this index.js
// npx create-react-app command not working?

// add input fields with "onChange parameter" - see bingo generator
// what happens when the cation or anion is empty?
// add ways to write the correct compound
    // incorporate objects and classes for anions and cations, have them have a "charge" property
    // and a "rule" property!

import React , {useState, useEffect} from 'react';
import FinalTable from './PeriodicTable';

const periodicTable = [['H', 'Li', 'Na', 'K', 'Rb', 'Cs'], // each array is a column, minus the transition metals
                       ['Be', 'Mg', 'Ca', 'Sr', 'Ba'], 
                       ['Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ag', 'Cd', 'Pt', 'Au', 'Hg'], 
                       ['Al'], // transition metals
                       [], // where C would be
                       ['N', 'P'],
                       ['O', 'S'],
                       ['F', 'Cl', 'Br', 'I']];

//const allThings = []; // all elements humanly conceivable on the PT, plus all polyatomic ions

const groupTwo = ['Be', 'Ca', 'Mg', 'Ba', 'Sr']; // add more!
const ruleSixExceptions = ['Ca', 'Ba', 'Sr'];

const ruleOne = ['NH4', 'H', 'Li', 'K', 'Rb', 'Cs', 'Na'];
const ruleTwo = ['NO3', 'ClO4', 'CH3COO', 'C2H3O2'];
const ruleThree = ['Hg', 'Pb', 'Ag'];
const ruleFour = ['Br', 'Cl', 'I'];
const ruleFive = ['PO4', 'CO3', 'S', 'O', 'CrO4', 'OH'];
const ruleSix = ['SO4'];

const flatten = (array) => {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        for (let x = 0; x < array[i].length; x++) {
            newArray.push(array[i][x]);
        }
    }
    return newArray;
}
let sortedPT = flatten(FinalTable);
sortedPT = sortedPT.sort((a,b) => a.getName().localeCompare(b.getName()));

// class Ion {
//     constructor(name, charge, rule) {
//         this.name = name; // a string
//         this.charge = charge; // an array of integers, positive or negative
//         this.type = (charge[0] > 0 ? 'cation' : 'anion');
//         this.rule = rule; // an integer, which rule the ion pertains to
//     }

//     getName() {
//         return this.name;
//     }

//     getCharge() {
//         return this.charge;
//     }

//     getType() {
//         return this.type;
//     }

//     getRule() {
//         return this.rule;
//     }
// }

const listEquals = (thing, list) => {
    // if at least one thing in the list is equal to the thing, return true

    for (let i = 0; i < list.length ; i++) {
        if (list[i] === thing) {
            return true;
        }
    }
    return false;
}

const findElement = (name) => { // name would be a string of the element's name
    let copy = [...sortedPT];
    console.log(copy);
    let index;
    let low = 0;
    let high = copy.length;
    
    for (let i = 0; i < copy.length; i++) {
        index = Math.floor(copy.length / 2);
        if (copy[index].getName().localeCompare(name) > 0) { // name goes before the half
            high = index - 1;
            

        } else if (copy[index].getName().localeCompare(name) < 0) { // name goes after the half
            low = index + 1;

        } else {
            return copy[index];
        }
        copy = copy.slice(low, high);
        console.log(copy);
        console.log(copy.length);
    }
    return 'couldnt be found';


    
}

const Compound = () => {
    console.log(FinalTable);
    console.log(sortedPT);
    console.log(findElement('Ag'));

    const [anion, setAnion] = useState('Cl'); // create state variables for the anion and cation of the compound
    const [cation, setCation] = useState('Ag');
    const [soluble, setSoluble] = useState(false);
    const [notAMol, setNotAMol] = useState(false);

    useEffect(() => {
        solubleOrNah(cation, anion);
        console.log('how often does this happen?');
    }, [cation, anion])

    const solubleOrNah = (cation, anion) => {
    // rule 1: ammonium, H, and all group 1 metals are soluble if in cation
    // rule 2: nitrates, perchlorates, and acetates are soluble if in cation
    // rule 3: if lead, merucry, or silver are in the anion, the comp is insoluble
    // rule 4: if bromine, chlorine, or iodine are in the anion, the comp is soluble
    // rule 5: phosphates, carbonates, sulfides, oxides, chromates, and hydroxides are insoluble
        // group 2 chromates: are soluble except for barium chromate
        // group 2 hydroxides are soluble except for magnesium hydroxide
    // rule 6: sulfates are soluble except for Ca, Ba, Sr sulfate

    setNotAMol(false);
    if (listEquals(cation, ruleOne)) {
        setSoluble(true);
        return;
    } else if (listEquals(anion, ruleTwo)) {
        setSoluble(true);
        return;
    } else if (listEquals(cation, ruleThree)) {
        setSoluble(false);
        console.log('this should appear');
        return;
    } else if (listEquals(anion, ruleFour)) {
        setSoluble(true);
        return;
    } else if (listEquals(anion, ruleFive)) {
        if (cation !== 'Mg' && listEquals(cation, groupTwo)) {
            setSoluble(true);
            return;
        } 
        setSoluble(false);
        return;
        
        
    } else if (listEquals(anion, ruleSix)) {
        if (listEquals(cation, ruleSixExceptions)) {
            setSoluble(false);
            return;
        }
        setSoluble(true);
        return;
        
    } else {
        setNotAMol(true);
        return;
    }
    //setSoluble(false);
}

    const handleCationChange = (e) => {
        const newCation = e.target.value;
        setCation(newCation);
    }

    const handleAnionChange = (e) => {
        const newAnion = e.target.value;
        setAnion(newAnion);
    }

    return <React.Fragment>
        <header>
            <h3 className="sol-title">
                Ionic Compounds Solubility Rules Checker
            </h3>
            <p>input a cation and an anion to see if the resulting ionic compound is soluble!</p>
        </header>

        {/* input a cation and anion here */}
        <div>
            <label htmlFor="cation">cation:</label>
            <input
            className=""
            type='text'
            id='cation'
            name='cation'
            value={cation}
            onChange={handleCationChange}
            />

            <label htmlFor="anion">anion:</label>
            <input
            className=""
            type='text'
            id='anion'
            name='anion'
            value={anion}
            onChange={handleAnionChange}
            />

        </div>
        

        <article>
            <h2>{cation + anion}</h2>
        </article>

        {/* <h2>{soluble ? 'soluble!' : 'insoluble :('}</h2> */}

        <h2 className={`${notAMol? 'not-mol' : (soluble ? 'sol' : 'insol')}`}>
            {notAMol ? 'not a valid cation or anion' : (soluble ? 'soluble!' : 'insoluble :(')}
        </h2>
    </React.Fragment>
}

export default Compound;