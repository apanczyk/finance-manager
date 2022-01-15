import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import GeneralChartFragment from "../../fragments/GeneralChartFragment";
import Operation from "../../model/Operation";
import Currency from "../../model/types/Currency";
import IUser from "../../model/types/UserType";
import IWallet from "../../model/types/WalletType";
import DataService from "../../service/api/DataService";
import WalletSelect from "./WalletSelect";

interface UserBoardViewProps {
    currentUser: IUser | undefined
}

export default function UserBoardView(props: UserBoardViewProps) {
    const [wallet, setWallet] = React.useState<string>()
    const [operations, setOperations] = React.useState(Array<Operation>())
    const [walletList, setWalletList] = React.useState<IWallet[]>([])
    const [currencyGeneral, setCurrencyGeneral] = React.useState<Array<Currency>>()

    const { currentUser } = props;

    const changeWallet = (walletId: string) => {
        setWallet(walletId)
        refreshData()
    }

    const changeWalletList = (walletListLocal: IWallet[]) => {
        setWalletList(walletList)
    }

    const refreshData = () => {
        if (wallet !== "" && wallet != null) {
            DataService.getOperations(wallet).then(response => {
                setOperations(response.data)
            }).catch(e => {
                console.log(e);
            });
        } else {
            DataService.getAll()
                .then(response => {
                    setOperations(response.data)
                }).catch(e => {
                    console.log(e);
                });
        }
    }

    React.useEffect(() => {
        if (wallet) {
            DataService.getCurrencyTable(wallet)
                .then(response => {
                    setCurrencyGeneral(response.data)
                }
                ).catch(e => {
                    console.log(e);
                });
        }
    }, [wallet]);

    return (
        <div >
            <Container component="main" maxWidth="lg">
                {wallet && (<GeneralChartFragment
                    wallet={wallet!}
                    operations={operations}
                />
                )}
                <WalletSelect currentUser={currentUser} outerChange={false} changeWallet={changeWallet} changeWalletList={changeWalletList} />
                <Container component="main" maxWidth="sm">
                    <TableContainer component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currencyGeneral && currencyGeneral.map((row) => (
                                    <TableRow key={row.currency}>
                                        <TableCell component="th" scope="row">
                                            {row.currency}
                                        </TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Container>
        </div >
    );
}
