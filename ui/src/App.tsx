import "./App.css"
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
import AdminBoard from './components/AdminBoard';
import UserBoard from './components/UserBoard';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import EventBus from './util/EventBus';
import IUser from './model/types/UserType';
import AuthService from './service/AuthService';
import { Component } from 'react';
import AuthVerifier from './util/AuthVerifier.js';

type Props = {};

type State = {
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.role === "ADMIN",
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
    window.location.reload();
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar currentUser={this.state.currentUser} showAdminBoard={this.state.showAdminBoard} logOut={this.logOut} />

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={UserBoard} />
              <Route path="/admin" component={AdminBoard} />

              <Route exact path="/add" component={AddOperation} />
              <Route exact path="/delete/:operationId" component={DeleteOperation} />
            </Switch>
          </div>

          <EnhancedTable />
          <OperationList />
          <AuthVerifier logOut={() => this.logOut()} />
        </div>
      </Router>
    );
  }
}

export default App;