import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

export const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export type AuthVerifyProperties = {
    logOut: () => void
} & RouteComponentProps

type State = {}

class AuthVerifier extends Component<AuthVerifyProperties, State> {

    constructor(props: AuthVerifyProperties) {
        super(props);

        props.history.listen(() => {
            this.checkIfExpired()
        });
    }

    checkIfExpired() {
        const user = JSON.parse(localStorage.getItem("user")!);
        if (user) {
            const decodedJwt = parseJwt(user.accessToken);
            if (decodedJwt.exp * 1000 < Date.now()) {
                this.props.logOut();
            }
        }
    }

    componentDidMount() {
        this.checkIfExpired()
    }

    render() {
        return <div></div>;
    }
}

export default withRouter(AuthVerifier);