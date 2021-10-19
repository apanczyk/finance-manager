import { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../service/AuthService";
import IUser from "../../model/types/UserType";
import Container from "@material-ui/core/Container";
import { Box, Typography } from "@mui/material";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string }
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" })
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div>
        {(this.state.userReady) ?
            <Container component="main" maxWidth="lg">
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  Test
                </Typography>

                <Typography component="h1" variant="h5">
                  {currentUser.email} Profile
                </Typography>

                <Typography component="h1" variant="h5">
                  Token:
                  {currentUser.accessToken.substring(0, 20)} ...{" "}
                  {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </Typography>

                <Typography component="h1" variant="h5">
                  Id: {currentUser.id}
                </Typography>

                <Typography component="h1" variant="h5">
                  Email: {currentUser.email}
                </Typography>

                <Typography component="h1" variant="h5">
                  Authorities: {currentUser.role}
                </Typography>
              </Box>
            </Container>
          : null}
      </div>
    );
  }
}
