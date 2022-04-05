// must always title this index.js
// npx create-react-app command not working?

// add input fields with "onChange parameter" - see bingo generator
// what happens when the cation or anion is empty?
// add ways to write the correct compound
    // incorporate objects and classes for anions and cations, have them have a "charge" property
    // and a "rule" property!


/*

TODO:
* convert subscripts into actually subscripts for polyatomic ions using sub tag
* figure out how to resolve the 2/2 subscript issue, where both ions have 2 as the subscript
* CSS styling

*/ 

import React , {useState, useEffect, useCallback} from 'react';
import FinalTable from './PeriodicTable';

// const periodicTable = [['H', 'Li', 'Na', 'K', 'Rb', 'Cs'], // each array is a column, minus the transition metals
//                        ['Be', 'Mg', 'Ca', 'Sr', 'Ba'], 
//                        ['Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ag', 'Cd', 'Pt', 'Au', 'Hg'], 
//                        ['Al'], // transition metals
//                        [], // where C would be
//                        ['N', 'P'],
//                        ['O', 'S'],
//                        ['F', 'Cl', 'Br', 'I']];

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

let sortedPT = flatten(FinalTable); // get rid of all the subarrays
sortedPT = sortedPT.sort((a,b) => a.getName().localeCompare(b.getName())); // then sort out in alphabetical order

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
    let index;
    let low = 0;
    let high = copy.length-1;
    
    while (low <= high) {
        index = Math.floor((low + high) / 2);
        if (copy[index].getName().localeCompare(name) > 0) { // name goes before the half
            high = index - 1;

        } else if (copy[index].getName().localeCompare(name) < 0) { // name goes after the half
            low = index + 1;

        } else {
            return copy[index];
        }
        
    }
    return false;

} // returns an object from the sortedPT that corresponds with the element inputted

const findCharge = (ion) => { // takes a string
    const test = findElement(ion); // returns an object or false
    if (!test) {
        return false;
    } else {
        return test.getCharge(); // RETURNS A ONE ELEMENT ARRAY
    }

}

const checkPoly = (string) => {
    const test = findElement(string);
    if (!test) {
        return false;
    } else {
        return test.getIsPolyatomic();
    }
}

const isValid = (cation, anion) => {
    // console.log(cation);
    // console.log(anion);
    // console.log(findElement(cation));
    // console.log(findElement(anion));
    // console.log(findCharge(cation)[0] > 0);
    // console.log(findCharge(anion)[0] < 0);
    // console.log((findElement('K') || findElement('Cl')) && findCharge('K')[0] > 0 && findCharge('Cl')[0] < 0);
    //console.log((!findElement(cation) || !findElement(anion)) && findCharge(cation) > 0 && findCharge(anion) < 0);
    //console.log((findElement(cation) || findElement(anion)) && findCharge(cation) > 0 && findCharge(anion) < 0);
    return (findElement(cation) || findElement(anion)) && findCharge(cation)[0] > 0 && findCharge(anion)[0] < 0;
}



const Compound = () => {
    //console.log(FinalTable);
    //console.log(sortedPT);
    //console.log(findElement('Ag'));
    //console.log("this is from the pc!! hope this actually works!");

    const [anion, setAnion] = useState('Cl'); // create state variables for the anion and cation of the compound
    const [cation, setCation] = useState('Ba');
    const [posCharge, setPosCharge] = useState(findCharge(cation));
    const [negCharge, setNegCharge] = useState(findCharge(anion));
    const [posSubscript, setPosSubscript] = useState(null);
    const [negSubscript, setNegSubscript] = useState(2);
    const [soluble, setSoluble] = useState(false);
    const [notAMol, setNotAMol] = useState(false);

    const displayedCharge = useCallback((ion) => { // takes in a string
        console.log(ion);
        let object = findElement(ion); // returns object from the sorted table
        console.log(object);
        console.log(isValid(cation, anion));
        if (isValid(cation, anion) && object) { // check if the current anion and cation work to form a coherent ionic compound
            //console.log(object);
            let type = object.getIsCation(); // check if the ion is a cation or not
            //console.log(type);
            let dispCharge;
            if (type) { // if the ion is a cation, its charge must be the anion's charge according to the criss-cross method
                dispCharge = (negCharge[0] === -1 ? '' : Math.abs(negCharge));
                console.log(dispCharge);
                return dispCharge;
            } else {
                dispCharge = (posCharge[0] === 1 ? '' : Math.abs(posCharge));
                console.log(dispCharge);
                return dispCharge;
                
            }

        } else {
            console.log('test');
            return false;
        }
        
    }, [cation, anion, negCharge, posCharge])

    useEffect(() => {
        solubleOrNah(cation, anion);
        setPosSubscript(displayedCharge(cation));
        setNegSubscript(displayedCharge(anion));
        //console.log(posSubscript, negSubscript);
        //console.log('how often does this happen?');
    }, [cation, anion, posSubscript, negSubscript, displayedCharge])

    

    const solubleOrNah = (cation, anion) => {
    // rule 1: ammonium, H, and all group 1 metals are soluble if in cation
    // rule 2: nitrates, perchlorates, and acetates are soluble if in cation
    // rule 3: if lead, merucry, or silver are in the anion, the comp is insoluble
    // rule 4: if bromine, chlorine, or iodine are in the anion, the comp is soluble
    // rule 5: phosphates, carbonates, sulfides, oxides, chromates, and hydroxides are insoluble
        // group 2 chromates: are soluble except for barium chromate
        // group 2 hydroxides are soluble except for magnesium hydroxide
    // rule 6: sulfates are soluble except for Ca, Ba, Sr sulfate

    setNotAMol(!isValid(cation, anion));
    if (listEquals(cation, ruleOne)) {
        setSoluble(true);
        return;
    } else if (listEquals(anion, ruleTwo)) {
        setSoluble(true);
        return;
    } else if (listEquals(cation, ruleThree)) {
        setSoluble(false);
        //console.log('this should appear');
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
        console.log(newCation);
        setCation(newCation);
        setPosCharge(findCharge(newCation));
        // setPosSubscript(displayedCharge(cation));
        // setNegSubscript(displayedCharge(anion));
        console.log("pos subscript: " + displayedCharge(newCation));
        console.log("pos charge: " + findCharge(newCation));
    }

    const handleAnionChange = (e) => {
        const newAnion = e.target.value;
        setAnion(newAnion);
        setNegCharge(findCharge(newAnion));
        // setNegSubscript(displayedCharge(anion));
        // setPosSubscript(displayedCharge(cation));
        console.log("neg subscript: " + negSubscript);
        console.log("neg charge: " + findCharge(newAnion));
    }

    return <React.Fragment>
        

        {/* input a cation and anion here */}
        <div className='form'>
  
            
            <input
            className="cat-input"
            type='text'
            id='cation'
            name='cation'
            value={cation}
            onChange={handleCationChange}
            placeholder=''
            autocomplete='off'
            />
            <label for='cation' className='cat-label'>cation</label>

            
            <input
            className="an-input"
            type='text'
            id='anion'
            name='anion'
            value={anion}
            onChange={handleAnionChange}
            placeholder=''
            autocomplete='off'
            />
            <label for='anion' className='an-label'>anion</label>

        </div>
        

        {/* <article>
            
            <h3>Cation charge: {posCharge}</h3>
            <h3>Anion charge: {negCharge}</h3>
        </article> */}

        <h2 className='displayed-comp'>{checkPoly(cation) && posSubscript !== '' ? "(" + cation + ")" : cation}<sub>{posSubscript}</sub>{checkPoly(anion) && negSubscript !== '' ? "(" + anion + ")" : anion}<sub>{negSubscript}</sub></h2>

        {/* <h2>{soluble ? 'soluble!' : 'insoluble :('}</h2> */}

        <h2 className={`result ${notAMol? 'not-mol' : (soluble ? 'sol' : 'insol')}`}>
            {notAMol ? 'not a valid cation or anion' : (soluble ? 'soluble!' : 'insoluble :(')}
        </h2>
    </React.Fragment>
}

export default Compound;