import { Component } from "react";
import AuthService from "../../service/AuthService";
import IUser from "../../model/types/UserType";
import Container from "@material-ui/core/Container";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import DataService from "../../api/DataService";
import IWallet from "../../model/types/WalletType";

type Props = {}

type State = {
    wallet: IWallet[],
    redirect: string | null,
    userReady: boolean,
    currentUser: IUser & { accessToken: string }
}
export default class WalletSelect extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { accessToken: "" },
            wallet: []
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/" })
        else this.getWallets(currentUser.id)
        this.setState({ currentUser: currentUser, userReady: true })
    }

    handleChange(event: SelectChangeEvent) {
        // this.setState({ wallet: event.target.value })
    };

    getWallets = (id: string) => {
        DataService.getWallets(id)
            .then(response => {
                console.log(response.data)
                this.setState({ wallet: response.data })
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <Container component="main" maxWidth="sm">
                <FormControl fullWidth>
                    <InputLabel id="wallet-select-label">Wallet</InputLabel>
                    <Select
                        labelId="wallet-select-label"
                        id="wallet-select"
                        // value={this.state.wallet}
                        label="Wallet"
                        onChange={this.handleChange}
                    >
                        {this.state.wallet.map(element => {
                            return <MenuItem value={element.id}>{element.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Container>
        );
    }
}
