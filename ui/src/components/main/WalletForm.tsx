import { Dialog, DialogTitle, Typography, Button, DialogContent, Stack, TableCell, Paper, TableContainer, Table, TableHead, TableRow, TableBody, IconButton, TextField } from "@mui/material";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { Dispatch, SetStateAction } from "react";
import IWallet from "../../model/types/WalletType";
import CloseIcon from '@mui/icons-material/Close';
import DataService from "../../service/api/DataService";
import AuthService from "../../service/AuthService";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogWrapper: {
            padding: theme.spacing(2),
            position: 'absolute',
            top: theme.spacing(5)
        },
        dialogTitle: {
            paddingRight: '0px'
        },
    }),
);

interface OperationFormProps {
    openPopup: boolean
    setOpenPopup: Dispatch<SetStateAction<boolean>>
    recordForEdit: IWallet[]
    editWalletList: (operation: IWallet[]) => void
}

export default function WalletForm(props: OperationFormProps) {
    const classes = useStyles();
    const [values, setValues] = React.useState<IWallet[]>([]);
    const { openPopup, setOpenPopup, recordForEdit, editWalletList } = props;

    React.useEffect(() => {
        if (recordForEdit != null) {
            const myClonedArray: IWallet[] = [];
            recordForEdit.forEach(wallet => myClonedArray.push(Object.assign({}, wallet)));
            setValues(
                myClonedArray
            )
        }
    }, [recordForEdit])

    const handleSubmit = (walletList: IWallet[]) => {
        editWalletList(walletList);
    }

    const addNewWallet = () => {
        let wallets = [...values]
        const currentUser = AuthService.getCurrentUser();

        DataService.getNewWalletForUser(currentUser.id)
            .then(response => {
                wallets.push(response.data)
                setValues(wallets)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const deleteWallets = (wallet: IWallet) => {
        let wallets = [...values]
        wallets.forEach((value, index) => {
            if (value.id === wallet.id) wallets.splice(index, 1);
        });
        setValues(wallets)
    }

    const resetWallets = () => {
        setValues(recordForEdit)
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        let wallets = [...values]
        wallets.forEach((value, index) => {
            if (value.id.toString() === event.target.id) wallets[index].name = event.target.value
        });
        setValues(wallets)
    }

    return (
        <Dialog
            open={openPopup}
            maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Wallets
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() => {
                            editWalletList(recordForEdit)
                            setOpenPopup(false);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="right" >
                                    Actions
                                    <IconButton color="primary" size="large" onClick={() => addNewWallet()}>
                                        <AddCircleIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values.map((wallet) => (
                                <TableRow
                                    key={wallet.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left">
                                        <TextField id={wallet.id.toString()} value={wallet.name} variant="standard" onChange={handleChangeName} required />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            disabled={wallet.isDefault}
                                            color="secondary"
                                            onClick={() => deleteWallets(wallet)}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant='outlined' color='secondary' onClick={() => handleSubmit(values)} fullWidth>
                        Submit
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={() => resetWallets()} fullWidth>
                        Reset
                    </Button>
                </Stack>
            </DialogContent >
        </Dialog >
    )
}
