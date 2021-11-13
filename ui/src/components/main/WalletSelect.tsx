import { Component } from "react";
import AuthService from "../../service/AuthService";
import IUser from "../../model/types/UserType";
import Container from "@material-ui/core/Container";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import DataService from "../../api/DataService";
import IWallet from "../../model/types/WalletType";

type Props = {}

type State = {
    wallet: IWallet | null,
    redirect: string | null,
    userReady: boolean,
    currentUser: IUser & { accessToken: string },
    walletList: IWallet[]
}
export default class WalletSelect extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            wallet: null,
            redirect: null,
            userReady: false,
            currentUser: { accessToken: "" },
            walletList: []
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) {
            this.getWallets(currentUser.id)
            this.state.walletList.forEach(element => {
                if (element.isDefault) this.setState({ wallet: element })
            }
            )
        }
        this.setState({ currentUser: currentUser, userReady: true })
    }

    handleChange(event: SelectChangeEvent) {
        // this.setState({ wallet: event.target.value })
    };

    getWallets = (id: string) => {
        DataService.getWallets(id)
            .then(response => {
                this.setState({ walletList: response.data })
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
                        defaultValue=""
                        labelId="wallet-select-label"
                        id="wallet-select"
                        value={this.state.wallet?.name}
                        label="Wallet"
                        onChange={this.handleChange}
                    >
                        {this.state.walletList.map(element => {
                            return <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Container>
        );
    }
}
