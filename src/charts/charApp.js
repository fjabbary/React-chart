import React, { Component } from 'react';

import { withStyles, MenuItem } from "@material-ui/core";
import Menu from './Menu';

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
    mainmenuitem: {
        fontSize: 25,
        fontWeight: 600,
        marginLeft: 25,
        marginTop: 30,

    },
    menuitem: {
        fontSize: 22,
        fontWeight: 600,
        marginLeft: 25,
    },
});

class ChartApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: false,
            checkwidth: false,
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }
    updateDimensions = () => {
        let width = window.innerWidth;
        if (width <= 960 && !this.state.checkwidth) {
            this.setState({ checkwidth: true });
        }
        if (width > 960 && this.state.checkwidth) {
            this.setState({ checkwidth: false });
        }
    };
    menugo = (str) => {
        if (str === 'dashboard') {
            this.props.history.push('dashboard');
        }
        if (str === 'home') {
            this.props.history.push('home');
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}
                style={!this.state.checkwidth ? { display: 'flex' } : { display: 'block' }}
            >
                {this.state.checkwidth && (
                    <Menu history={this.props.history} />
                )}
                {!this.state.checkwidth ? (
                    <div style={!this.state.checkwidth ? { width: 250 } : { width: '0%' }}>
                        <div >
                            <div className={classes.mainmenuitem}>
                                Menu
                                </div>
                            <br /><br /><br /><br />
                            <div className={classes.menuitem}>
                                <MenuItem onClick={() => this.menugo('home')}> Home</MenuItem>
                            </div>
                            <br />
                            <div className={classes.menuitem}>
                                <MenuItem onClick={() => this.menugo('dashboard')}>Dashboard</MenuItem>

                            </div>
                        </div>
                    </div>
                ) :
                    (<div />)}
                <div style={!this.state.checkwidth ? { width: 'calc(100% - 250px)' } : { width: '100%' }}>
                    {!this.state.checkwidth && (
                        <div style={{ height: 64, backgroundColor: 'rgb(63, 81, 181)' }}>
                            <span style={{
                                fontSize: 20,
                                color: 'white',
                                fontWeight: 700,
                                lineHeight: 3,
                                paddingLeft: 20,
                            }}>AlfanFrontEndTest</span>
                        </div>
                    )}
                    <p style={{ paddingLeft: 80, fontSize: 22 }}>Home</p>

                </div>

            </div>
        )


    }
}



export default withStyles(styles, { withTheme: true })((ChartApp));