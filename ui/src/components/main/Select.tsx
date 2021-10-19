import { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../service/AuthService";
import IUser from "../../model/types/UserType";
import Container from "@material-ui/core/Container";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

type Props = {}

type State = {
    wallet: string | undefined,
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
            currentUser: { accessToken: "" },
            wallet: undefined
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/" })
        this.setState({ currentUser: currentUser, userReady: true })
    }

    handleChange(event: SelectChangeEvent) {
        this.setState({ wallet: event.target.value })
    };

    render() {
        return (
            <Container component="main" maxWidth="lg">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="wallet-select-label">Wallet</InputLabel>
                        <Select
                            labelId="wallet-select-label"
                            id="wallet-select"
                            value={this.state.wallet}
                            label="Wallet"
                            onChange={this.handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Container>
        );
    }
}
