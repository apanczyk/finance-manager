import logo from './logo.svg';
import './App.css';
import NavBar from './fragments/NavBar';
import EnhancedTable from './NewTable';
import OperationList from './model/OperationList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <NavBar currentUser={this.state.currentUser} logOut={this.logOut} />
          <EnhancedTable />
          <OperationList />

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Aplikacja
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {/* {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.email}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )} */}
          </nav>

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

          <AuthVerifier logOut={() => this.logOut()} />
        </div>
      </Router>
    );
  }
}

export default App;