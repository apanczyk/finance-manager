import AuthService from "../../service/AuthService";
import Container from "@material-ui/core/Container";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import DataService from "../../api/DataService";
import IWallet from "../../model/types/WalletType";
import React from "react";

interface WalletSelectFormProps {
    changeWallet: (walletId: string) => void
}

export default function WalletSelect(props: WalletSelectFormProps) {

    const [walletId, setWalletId] = React.useState<string>("")
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
                console.log("XDDD" + response.data)
                setWalletList(response.data)
                response.data.forEach((element: IWallet) => {
                    if (element.isDefault)
                        setWalletId(element.id.toString())
                })
            })
            .catch(e => {
                console.log(e);
            });
        console.log(walletList)
    }


    return (
        <Container component="main" maxWidth="sm">
            <FormControl fullWidth>
                <InputLabel id="wallet-select-label">Wallet</InputLabel>
                <Select
                    defaultValue=""
                    labelId="wallet-select-label"
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
