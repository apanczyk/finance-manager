import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Operation from '../../model/Operation';
import DataService from '../../service/api/DataService';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import OperationForm from './OperationForm';
import WalletSelect from './WalletSelect';
import Category from '../../model/Category';
import ChartFragment from '../../fragments/ChartFragment';
import { format } from "date-fns";
import IWallet from '../../model/types/WalletType';
import WalletForm from './WalletForm';
import IUser from '../../model/types/UserType';

const emptyOperation: Operation = {
    id: "",
    name: "",
    amount: 0,
    place: "",
    date: format(new Date(), "yyyy/MM/dd"),
    category: {
        id: 0,
        name: '',
        type: ''
    } as Category,
    categoryName: "",
    categoryType: "",
    walletId: 0
}

function ascComp<T>(firstValue: T, secondValue: T, orderBy: keyof T) {
    if (orderBy === 'date') {
        if (new Date(secondValue[orderBy] as unknown as string) <
            new Date(firstValue[orderBy] as unknown as string)) {
            return -1;
        } else if (new Date(secondValue[orderBy] as unknown as string) >
            new Date(firstValue[orderBy] as unknown as string)) {
            return 1;
        } else {
            return 0;
        }
    }

    if (secondValue[orderBy] < firstValue[orderBy]) {
        return -1;
    } else if (secondValue[orderBy] > firstValue[orderBy]) {
        return 1;
    } else {
        return 0;
    }
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string | Category | Date }, b: { [key in Key]: number | string | Category | Date }) => number {
    return order === 'desc'
        ? (a, b) => ascComp(a, b, orderBy)
        : (a, b) => -ascComp(a, b, orderBy);
}

function sortOperation<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Operation | string;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'name', disablePadding: false, label: 'Name' },
    { id: 'amount', disablePadding: false, label: 'Amount' },
    { id: 'place', disablePadding: false, label: 'Place' },
    { id: 'date', disablePadding: false, label: 'Operation date' },
    { id: 'categoryName', disablePadding: false, label: 'Category' },
    { id: 'categoryType', disablePadding: false, label: 'Category Type' },
];

interface OperationTableProps {
    classes: ReturnType<typeof useStyles>;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Operation) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function OperationTableHead(props: OperationTableProps) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Operation | any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell />
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='right'
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell />
            </TableRow>
        </TableHead>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        title: {
            flex: '1 1 100%',
        },
    }),
);

interface OperationTableProperties {
    currentUser: IUser | undefined
}

export default function OperationTable(props: OperationTableProperties) {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Operation>('date');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [operations, setOperations] = React.useState(Array<Operation>());
    const [wallet, setWallet] = React.useState<string>()
    const [walletList, setWalletList] = React.useState<IWallet[]>([])

    const [operationForEdit, setOperationForEdit] = React.useState(emptyOperation)
    const [openOperationPopup, setOpenOperationsPopup] = React.useState(false)

    const [walletsForEdit, setWalletsForEdit] = React.useState<IWallet[]>([])
    const [openWalletListPopup, setOpenWalletListPopup] = React.useState(false)

    const { currentUser } = props;
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Operation) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteOperation = (operation: Operation) => {
        DataService.delete(operation.id).then(() =>
            refreshData()
        ).catch(e => {
            console.log(e);
        });
    }

    const editOrAddOperation = (operation: Operation) => {
        operation.walletId = Number(wallet)
        if (operation.id === "0")
            DataService.create(operation)
        else
            DataService.update(operation)

        setOperationForEdit(emptyOperation)
        setOpenOperationsPopup(false)
        refreshData()
    }

    const editWallets = (walletList: IWallet[]) => {
        DataService.updateWallets(currentUser?.id, walletList)
            .then(response => {
                changeWalletList(response.data)
                refreshData()
                setOpenWalletListPopup(false)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const changeWallet = (walletId: string) => {
        setWallet(walletId)
        setPage(0)
    }

    const changeWalletList = (walletList: IWallet[]) => {
        setWalletList(walletList)
    }

    React.useEffect(() => {
        refreshData()
        setPage(0)
    }, [wallet]); // eslint-disable-line react-hooks/exhaustive-deps

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

    const openOperationWindowsInPopup = (item: any) => {
        setOperationForEdit(item)
        setOpenOperationsPopup(true)
    }

    const openWalletWindowsInPopup = () => {
        setWalletsForEdit(walletList)
        setOpenWalletListPopup(true)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, operations.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            {wallet && (<ChartFragment
                wallet={wallet!}
                operations={operations}
            />
            )}
            <Toolbar className={clsx(classes.root)}>
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Operations
                </Typography>
                <WalletSelect currentUser={currentUser} outerChange={openWalletListPopup} changeWallet={changeWallet} changeWalletList={changeWalletList} />
                <IconButton color="secondary" size="large" onClick={() => openWalletWindowsInPopup()}>
                    <EditIcon />
                </IconButton>
                <IconButton color="primary" size="large" onClick={() => openOperationWindowsInPopup(emptyOperation)}>
                    <AddCircleIcon />
                </IconButton>
            </Toolbar>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='small'
                    aria-label="enhanced table"
                >
                    <OperationTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={operations.length}
                    />
                    <TableBody>
                        {sortOperation(operations, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((operation, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={operation.id}
                                    >
                                        <TableCell padding="checkbox">

                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {operation.name}
                                        </TableCell>
                                        <TableCell align="right">{operation.amount}</TableCell>
                                        <TableCell align="right">{operation.place}</TableCell>
                                        <TableCell align="right">{format(new Date(operation.date), "yyyy/MM/dd")}</TableCell>
                                        <TableCell align="right">{operation.categoryName}</TableCell>
                                        <TableCell align="right">{operation.categoryType}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                color="primary"
                                                onClick={() => openOperationWindowsInPopup(operation)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => deleteOperation(operation)}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 40 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={operations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <OperationForm
                openPopup={openOperationPopup}
                setOpenPopup={setOpenOperationsPopup}
                recordForEdit={operationForEdit}
                editOrAddOperation={editOrAddOperation}
            />
            <WalletForm
                currentUser={currentUser}
                openPopup={openWalletListPopup}
                setOpenPopup={setOpenWalletListPopup}
                recordForEdit={walletsForEdit}
                editWalletList={editWallets}
            />
        </div >
    );
}
