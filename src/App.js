import logo from './logo.svg';
import './App.css';
import Compound from './Compound';

function App() {
  return (
    <div className="App">
      <header>
            <h1 className="sol-title">
                Ionic Compounds Solubility Rules Checker
            </h1>
        </header>
      <div className='main-container'>
        <p>input a cation and an anion to see if the resulting ionic compound is soluble!</p>  
        <Compound />
      </div>
        
    </div>
  );
}

export default App;
