import AuthService from "../../service/AuthService";
import Container from "@material-ui/core/Container";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import DataService from "../../service/api/DataService";
import IWallet from "../../model/types/WalletType";
import React from "react";

interface WalletSelectFormProps {
    changeWallet: (walletId: string) => void
}

export default function WalletSelect(props: WalletSelectFormProps) {

    const [walletId, setWalletId] = React.useState<string>('')
    const [walletList, setWalletList] = React.useState<IWallet[]>([])
    const { changeWallet } = props

    const handleChange = (event: SelectChangeEvent) => {
        setWalletId(event.target.value)
        changeWallet(event.target.value)
    };

    React.useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        getWallets(currentUser.id)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getWallets = (id: string) => {
        DataService.getWallets(id)
            .then(response => {
                setWalletList(response.data)
                response.data.forEach((element: IWallet) => {
                    if (element.isDefault)
                        setWalletId(element.id.toString())
                    changeWallet(element.id.toString())
                })
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <Container component="main" maxWidth="sm">
            <FormControl fullWidth>
                <InputLabel id="walletSelect">Wallet</InputLabel>
                <Select
                    defaultValue=""
                    labelId="walletSelect"
                    id="wallet-select"
                    value={walletId}
                    label="Wallet"
                    onChange={handleChange}
                >
                    {walletList.map(element => {
                        return <MenuItem
                            key={element.id}
                            value={element.id}>
                            {element.name}
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
        </Container>
    );
}
