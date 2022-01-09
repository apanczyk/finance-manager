import { Box, Container } from "@mui/material";
import { Component } from "react";
import IUser from "../../model/types/UserType";
import AuthService from "../../service/AuthService";

import UserService from "../../service/UserService";
import OperationTable from "../main/OperationTable";

type Props = {};

type State = {
  content: string;
  currentUser: IUser | undefined

}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "",
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user
      });
    }

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
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
      </div>
    );
  }
}
