import React, { Component } from 'react';
import {
    Typography,
    AppBar, Toolbar, IconButton, SwipeableDrawer,
    List, ListItem, ListItemIcon, ListItemText,

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from "@material-ui/core";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 10,
    },
    title: {
        flexGrow: 1,
        color: 'white',
    },
});

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: false,
        }
    }

    toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ [side]: open });

    };
    menugo = (str) => {
        if (str === 'dashboard') {
            this.props.history.push('dashboard');
        }
        if (str === 'home') {
            this.props.history.push('home');
        }
    }
    sideList = (side) => {
        const { classes } = this.props;


        return (
            <div
                className={classes.list}
                role="presentation"
                onClick={() => this.toggleDrawer(side, false)}
                onKeyDown={() => this.toggleDrawer(side, false)}
            >
                <List>
                    <ListItem button key={'Home'} onClick={() => this.menugo('home')}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                    <ListItem button key={'Dashboard'} onClick={() => this.menugo('dashboard')}>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                </List>

            </div>
        );
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                    {this.sideList('left')}
                </SwipeableDrawer>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            AlfanFrontEndTest
                        </Typography>

                    </Toolbar>
                </AppBar>
            </div>
        )


    }
}



export default withStyles(styles, { withTheme: true })(Menu);