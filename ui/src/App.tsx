import NavBar from './fragments/NavBar';
import OperationTable from './components/main/OperationTable';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import AdminBoard from './components/auth/AdminBoard';
import UserBoard from './components/auth/UserBoard';
import Profile from './components/auth/Profile';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/auth/Home';
import EventBus from './util/EventBus';
import IUser from './model/types/UserType';
import AuthService from './service/AuthService';
import { Component } from 'react';
import Box from "@mui/material/Box";
import { Container } from "@material-ui/core";
import RedirectRoute from "./components/auth/RedirectRoute";
import AuthVerifier from './util/AuthVerifier';

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
    let user = this.state.currentUser
    return (
      <Router>
        <NavBar currentUser={this.state.currentUser} showAdminBoard={this.state.showAdminBoard} logOut={this.logOut} />

        <div>
          <Switch>
            <RedirectRoute user={user} antiAuth={true} exact path="/login" redirectPath="/" component={Login} />
            <RedirectRoute user={user} antiAuth={true} exact path="/register" redirectPath="/" component={Register} />
            <RedirectRoute user={user} antiAuth={false} exact path="/" redirectPath="/login" component={Home} />
            <RedirectRoute user={user} antiAuth={false} exact path="/profile" redirectPath="/login" component={Profile} />
            <RedirectRoute user={user} antiAuth={false} exact path="/user" redirectPath="/login" component={UserBoard} />
            <RedirectRoute user={user} antiAuth={false} exact path="/admin" redirectPath="/login" component={AdminBoard} />
          </Switch>
        </div>

        {
          this.state.currentUser && (
            <div>
              <Container component="main" maxWidth="lg">
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <OperationTable currentUser={this.state.currentUser} />
                </Box>
              </Container>
            </div>
          )
        }
        <AuthVerifier logOut={() => this.logOut()} />
      </Router>
    );
  }
}

export default App;
