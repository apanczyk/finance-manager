import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, ListItemText, ListItemIcon, Divider, ListItem, List, Drawer, Link } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        list: {
            width: 250,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        fullList: {
            width: 'auto',
        },
    }),
);

type Anchor = 'left';

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.MouseEvent,
    ) => {
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button component={Link} href="/add">
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary={`Google`} />
                    {/* </Link> */}

                </ListItem>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            {(['left'] as Anchor[]).map((anchor) => {
                return (
                    <React.Fragment key={anchor}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                );
            })}
        </div>
    );
}
