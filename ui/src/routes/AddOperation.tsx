import { Component, ChangeEvent } from "react";
import DataService from "../api/DataService"
import Operation from "../model/Operation";
import { createStyles } from '@material-ui/core/styles';
import { Button, TextField, WithStyles, withStyles } from "@material-ui/core";
import React from "react";

const styles = (theme: any) => createStyles({
    root: {
        margin: theme.spacing(1),
        width: '25ch',
    },
});

interface Props extends WithStyles<typeof styles> { }

type State = Operation & {
    submitted: boolean
}

class AddOperation extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newOperation = this.newOperation.bind(this);

        this.state = {
            id: null,
            name: "",
            amount: null,
            place: "",
            submitted: false
        };
    }

    onChangeAmount(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            amount: Number(e.target.value)
        });
    }

    onChangeName(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePlace(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            place: e.target.value
        });
    }

    saveTutorial() {
        const data: Operation = {
            name: this.state.name,
            amount: this.state.amount,
            place: this.state.place
        };

        DataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    amount: response.data.amount,
                    place: response.data.place,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newOperation() {
        this.setState({
            id: null,
            name: "",
            amount: null,
            place: "",
            submitted: false
        });
    }

    render() {
        const { name, amount, place } = this.state;

        return (
            <React.Fragment>
                <form noValidate autoComplete="off" >
                    <TextField id="amount" label="Amount" value={amount} onChange={this.onChangeAmount} variant="filled" />
                    <TextField id="name" label="Name" value={name} onChange={this.onChangeName} variant="filled" />
                    <TextField id="place" label="Place" value={place} onChange={this.onChangePlace} variant="filled" />
                </form>

                <Button onClick={this.saveTutorial}>
                    Add operation
                </Button>
            </React.Fragment>
        );
    }
} export default withStyles(styles)(AddOperation)