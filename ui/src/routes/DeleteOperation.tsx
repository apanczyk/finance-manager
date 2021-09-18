import React, { Component } from "react";
import { Redirect } from "react-router";
import { RouteComponentProps } from 'react-router';
import DataService from "../api/DataService";

interface Props extends RouteComponentProps<MatchParams> {
}

interface MatchParams {
    operationId: string;
}

type State = {
    operationId: string
}

class DeleteOperation extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            operationId: props.match.params.operationId
        }
        console.log(this.state.operationId)
    }


    fetchVisitorsList = () => {
        DataService.delete(this.state.operationId);
    };

    componentDidMount() {
        this.fetchVisitorsList()
    }

    render() {
        return (
            <Redirect to={{
                pathname: "/"
            }} />
        )

    }
}
export default DeleteOperation