import React, { Component } from "react";
import DataService from "../api/DataService";
import Operation from "./Operation";

type Props = {};


type State = {
    operations: Array<Operation>
};

export default class OperationList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            operations: []
        };
    }


    componentDidMount() {
        DataService.getAll()
            .then(response => {
                this.setState({
                    operations: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        const { operations } = this.state
        return (
            <div className="list row">
                <ul className="list-group">
                    {operations &&
                        operations.map((operation: Operation, index: number) => (
                            <li
                                className={
                                    "list-group-item "
                                }
                                key={index}
                            >
                                {operation.name}
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}