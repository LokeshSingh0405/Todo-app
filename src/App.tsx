import './App.css';
import Date from './Components/Date';
import Header from './Components/Header';
import Todo from './Components/Todo';

function App() {
  return (
    <div className="App">
        <Header/>
        <Date/>        <Todo/>
    </div>
  );
}

export default App;
