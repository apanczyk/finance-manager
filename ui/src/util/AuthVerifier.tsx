import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import IUser from "../model/types/user.type";
import AuthService from "../service/auth.service";
import EventBus from "./EventBus";


interface RouterProps {
    history: string
  }
  
  interface SampleProps {
    logOut: () => void     
  }

  type Props = RouteComponentProps<RouterProps> | {logOut: () => void };
  
  type State = {
  };
  

const parseJwt = (token: any) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

class AuthVerifier extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // const{history  } = props;

    props.history.listen(() => {
        const currentUser = AuthService.getCurrentUser();

      if (currentUser) {
        const decodedJwt = parseJwt(currentUser.accessToken);

        if (decodedJwt.exp * 1000 < Date.now()) {
            props.logOut();
        }
      }
    });
  }

  render() {
    return <div></div>;
  }
}

export default AuthVerifier