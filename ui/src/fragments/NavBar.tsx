import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '../Drawer';
import { Link } from '@material-ui/core';
import IUser from '../model/types/UserType';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

interface Props {
    currentUser: IUser | undefined
    logOut: () => void;
}


export default function NavBar(props: React.PropsWithChildren<Props>) {
    const classes = useStyles();
    const { currentUser, logOut } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Drawer />
                    <Typography variant="h6" className={classes.title}>
                        <Link href={"/"} underline="none" color="inherit">
                            {"Finance"}
                        </Link>
                    </Typography>
                    {currentUser ? (
                        <>
                            <Button color="inherit" href="/profile">
                                {currentUser.email}
                            </Button>
                            <Button color="inherit" onClick={logOut}>
                                LogOut
                            </Button>

                        </>
                    ) : (
                        <>
                            <Button color="inherit" href="/login">
                                Login
                            </Button>
                            <Button color="inherit" href="/register">
                                Sign Up
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
