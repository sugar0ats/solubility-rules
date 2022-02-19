import logo from './logo.svg';
import './App.css';
import Compound from './Compound';

function App() {
  return (
    <div className="App">
      <header>
            <h3 className="sol-title">
                Ionic Compounds Solubility Rules Checker
            </h3>
            <p>input a cation and an anion to see if the resulting ionic compound is soluble!</p>
        </header>
        
      <Compound />
    </div>
  );
}

export default App;
