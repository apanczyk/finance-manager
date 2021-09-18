import logo from './logo.svg';
import './App.css';
import NavBar from './fragments/NavBar';
import EnhancedTable from './NewTable';
import OperationList from './model/OperationList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import AddOperation from './routes/AddOperation';
import DeleteOperation from './routes/DeleteOperation';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <EnhancedTable />
        <OperationList />
        <Switch>
          <Route exact path="/add" component={AddOperation} />
          <Route exact path="/delete/:operationId" component={DeleteOperation} />
        </Switch>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    </Router>
  );
}

export default App;

  //      {/* <Route exact path="/add" component={AddOperation} />

  //     </Switch>
  //     <NavBar />
  //     {/* <FinanceTable/> */}
  //     <EnhancedTable />
  //     <OperationList />
  // */}
