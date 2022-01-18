import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    Link
} from 'react-router-dom'
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
    showAdminBoard: boolean
    logOut: () => void;
}


export default function NavBar(props: React.PropsWithChildren<Props>) {
    const classes = useStyles();
    const { currentUser, showAdminBoard, logOut } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button component={Link} to="/" color="inherit" >
                            {"Finance"}
                        </Button>
                        {currentUser && (
                            <Button component={Link} to="/user" color="inherit">
                                Summary
                            </Button>
                        )}
                        {showAdminBoard && (
                            <Button component={Link} to="/admin" color="inherit">
                                Admin Board
                            </Button>
                        )}
                    </Typography>
                    {currentUser ? (
                        <>
                            <Button component={Link} to="/profile" color="inherit" >
                                {currentUser.email}
                            </Button>
                            <Button color="inherit" onClick={logOut}>
                                LogOut
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/login" color="inherit" >
                                Login
                            </Button>
                            <Button component={Link} to="/register" color="inherit" >
                                Sign Up
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
