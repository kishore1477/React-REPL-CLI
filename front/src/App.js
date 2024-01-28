import logo from './logo.svg';
import './App.css';
import TerminalCLI from './components/TerminalCLI';
// import CLI from './CLI';
function App() {
  return (
    <div className="App" style={{margin:'40px'}}>
     {/* <CLI/> */}
     <TerminalCLI/>
    </div>
  );
}

export default App;
