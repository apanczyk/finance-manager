import { Component } from "react";
import IUser from "../../model/types/UserType";
import AuthService from "../../service/AuthService";

import UserService from "../../service/UserService";
import EventBus from "../../util/EventBus";
import UserBoardView from "../main/UserBoardView";

type Props = {};

type State = {
  content: string;
  currentUser: IUser | undefined;
}

export default class UserBoard extends Component<Props, State> {
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

    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }


  render() {
    return (
      <div >
        {this.state.currentUser && (
          <UserBoardView currentUser={this.state.currentUser} />
        )}
      </div>
    );
  }
}
