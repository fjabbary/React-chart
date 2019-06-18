import React, { Component } from 'react';
import { Popover, MenuItem, IconButton, Paper } from '@material-ui/core';
import MorevertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from "@material-ui/core";

import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import Menu from './Menu';

//for charts
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


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
    carditem1: {
        width: '65%',
        margin: 20,
        height: 200,
    },
    carditem2: {
        width: '35%',
        margin: 20,
        height: 350,
    },
    carditem3: {
        width: '50%',
        margin: 20,
        height: 350,
    },
    cardtitle: {
        fontSize: 20,
        fontWeight: 1000,
        marginLeft: 50,
        paddingTop: 10,
    },
    carditemtitle: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    carditemcolor: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    cardlablewithcolor: {
        display: 'flex'
    },
    cardtitlecolortxt: {
        fontWeight: 1000,
        marginRight: 20,
    },
    paperitemheight: {
        height: 325,
    },
    simplecontent: {
        textAlign: 'center',
        marginLeft: 20,
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

const ChartData =
    [
        {
            name: 'First',
            series: [
                { name: 5, value: 2650 },
                { name: 10, value: 2800 },
                { name: 15, value: 2000 }
            ]
        },
        {
            name: 'Second',
            series: [
                { name: 5, value: 2300 },
                { name: 10, value: 3100 },
                { name: 15, value: 1700 }
            ]
        }
    ];

class DashboardApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: false,
            data: [],
            checkstate: false,
            checkwidth: false,
        }
    }
    componentDidMount() {
        this.makedata();
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.checkstate !== prevState.checkstate) {
            this.makedata();
        }

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
    makedata = () => {
        let getdata = ChartData;
        let res = [];
        if (getdata && getdata.length > 0) {
            getdata.map((_data, index) => {
                let midres = {};
                midres.type = "area";
                let name = _data.name ? _data.name : "";
                let mdata = _data.series;
                let midrealdata = [];
                if (mdata && mdata.length > 0) {
                    mdata.map((_mdata, index) => {
                        let adddata = {};
                        adddata.x = _mdata.name;
                        adddata.y = _mdata.value;
                        midrealdata.push(adddata);
                    });
                }

                midres.name = name;
                midres.showInLegend = true;
                let itemname = 'carditem' + (index + 1) + name + 'Color';
                if (this.state[itemname]) {
                    midres.color = this.state[itemname];
                }
                else {
                    if (name === 'First') {
                        midres.color = '#0c1ecc';
                    }
                    else {
                        midres.color = '#12ccb8';
                    }
                }
                midres.dataPoints = midrealdata;
                res.push(midres);
            });
        }
        this.setState({ data: res });
    };

    changeHandler = (colors, name) => {
    }

    closeHandler = (colors, name) => {
        let colornames = 'carditem' + name + 'Color';
        let alphanames = 'carditem' + name + 'Alpha';
        this.setState({ [colornames]: colors.color });
        this.setState({ [alphanames]: colors.alpha });
        this.setState({ checkstate: !this.state.checkstate });
        console.log(colors);
    }
    morebutton = (e, str) => {
        this.setState({ [str]: e.currentTarget })
    }
    menuclose = (str) => {
        this.setState({ [str]: null });
    }
    expandmenu = () => {

    }
    removemenu = () => {

    }
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
        if (ChartData && ChartData.length > 0) {

        }
        const options = {
            theme: "light2",
            title: {
                text: ""
            },
            subtitles: [{
                text: "title"
            }],
            axisY: {
                includeZero: false,
                title: "Color Value",
                // prefix: "$"
            },
            toolTip: {
                shared: true
            },
            height: 250,
            data: [...this.state.data]
        }

        return (
            <div
                className={classes.root}
                style={!this.state.checkwidth ? { display: 'flex' } : { display: 'block' }}
            >
                {this.state.checkwidth && (
                    <Menu history={this.props.history} />
                )}
                {!this.state.checkwidth ? (
                    <div style={!this.state.checkwidth ? { width: 250 } : { width: '0%' }} >
                        <div>
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
                        <div style={{ height: 64, backgroundColor: 'rgb(63, 81, 181)', color: 'red' }}>
                            <span style={{
                                fontSize: 20,
                                color: 'white',
                                fontWeight: 700,
                                lineHeight: 3,
                                paddingLeft: 20,
                            }}>AlfanFrontEndTest</span>
                        </div>
                    )}

                    <div><span style={{ fontSize: 30, fontWeight: 1000, marginLeft: 50 }}>Dashboard</span></div>
                    <div style={{ display: 'flex' }}>
                        <div className={classes.carditem1}>
                            <Paper >
                                <div className={classes.carditemtitle}>
                                    <span className={classes.cardtitle}>Card 1</span>
                                    <div ><IconButton onClick={(e) => this.morebutton(e, 'card1menu')}><MorevertIcon /></IconButton></div>
                                </div>
                                <div className={classes.carditemcolor}>
                                    <div className={classes.cardlablewithcolor}>
                                        <span className={classes.cardtitlecolortxt}>
                                            First Color
                                    </span>

                                        <ColorPicker
                                            color={this.state.carditem1FirstColor ? this.state.carditem1FirstColor : '#0c1ecc'}
                                            alpha={this.state.carditem1FirstAlpha ? this.state.carditem1FirstAlpha : 100}
                                            onChange={(e) => this.changeHandler(e, '1First')}
                                            onClose={(e) => this.closeHandler(e, '1First')}
                                            placement="topLeft"
                                            className="some-class"
                                        >
                                            <span className="rc-color-picker-trigger" />
                                        </ColorPicker>
                                    </div>
                                    <div className={classes.cardlablewithcolor}>
                                        <span className={classes.cardtitlecolortxt}>
                                            Second Color
                                    </span>

                                        <ColorPicker
                                            color={this.state.carditem2SecondColor ? this.state.carditem2SecondColor : '#12ccb8'}
                                            alpha={this.state.carditem2SecondAlpha ? this.state.carditem2SecondAlpha : 100}
                                            onChange={(e) => this.changeHandler(e, '2Second')}
                                            onClose={(e) => this.closeHandler(e, '2Second')}
                                            placement="topLeft"
                                            className="some-class"
                                        >
                                            <span className="rc-color-picker-trigger" />
                                        </ColorPicker>
                                    </div>
                                </div>
                                <CanvasJSChart options={options}
                                    style={{ height: 300 }}
                                />
                            </Paper>
                            <Popover
                                open={Boolean(this.state.card1menu)}
                                anchorEl={this.state.card1menu}
                                onClose={() => this.menuclose('card1menu')}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                classes={{
                                    paper: "py-8",
                                }}

                            >
                                <React.Fragment>
                                    <MenuItem value={"1"} className={classes.menu} style={{ borderRadius: 0 }} onClick={() => { this.expandmenu() }}>Expand</MenuItem>
                                    <MenuItem value={"2"} className={classes.menu} style={{ borderRadius: 0 }} onClick={() => { this.removemenu() }}>Remove</MenuItem>
                                </React.Fragment>

                            </Popover>
                        </div>
                        <div className={classes.carditem2}>
                            <Paper className={classes.paperitemheight}>
                                <div className={classes.carditemtitle}>
                                    <span className={classes.cardtitle}>Card 2</span>
                                    <div ><IconButton onClick={(e) => this.morebutton(e, 'card2menu')}><MorevertIcon /></IconButton></div>
                                </div>
                                <div className={classes.simplecontent}>card Content</div>
                            </Paper>

                        </div>
                        <Popover
                            open={Boolean(this.state.card2menu)}
                            anchorEl={this.state.card2menu}
                            onClose={() => this.menuclose('card2menu')}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            classes={{
                                paper: "py-8",
                            }}

                        >
                            <React.Fragment>
                                <MenuItem value={"1"} className={classes.menu} style={{ borderRadius: 0 }} onClick={() => { this.expandmenu() }}>Expand</MenuItem>
                                <MenuItem value={"2"} className={classes.menu} style={{ borderRadius: 0 }} onClick={() => { this.removemenu() }}>Remove</MenuItem>
                            </React.Fragment>

                        </Popover>

                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className={classes.carditem3}>
                            <Paper className={classes.paperitemheight}>
                                <div className={classes.carditemtitle}>
                                    <span className={classes.cardtitle}>Card 3</span>
                                    <div ><IconButton onClick={(e) => this.morebutton(e, 'card3menu')}><MorevertIcon /></IconButton></div>
                                </div>
                                <div className={classes.simplecontent}>card Content</div>
                            </Paper>

                        </div>
                        <Popover
                            open={Boolean(this.state.card3menu)}
                            anchorEl={this.state.card3menu}
                            onClose={() => this.menuclose('card3menu')}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            classes={{
                                paper: "py-8",
                            }}

                        >
                            <React.Fragment>
                                <MenuItem value={"1"} className={classes.menu} style={{ borderRadius: 0 }} onClick={() => { this.expandmenu() }}>Expand</MenuItem>
                                <MenuItem value={"2"} className={classes.menu} style={{ borderRadius: 0 }} onClick={() => { this.removemenu() }}>Remove</MenuItem>
                            </React.Fragment>

                        </Popover>
                        <div className={classes.carditem3}>
                            <Paper className={classes.paperitemheight}>
                                <div className={classes.carditemtitle}>
                                    <span className={classes.cardtitle}>Card 4</span>
                                    <div ><IconButton onClick={(e) => this.morebutton(e, 'card4menu')}><MorevertIcon /></IconButton></div>
                                </div>
                                <div className={classes.simplecontent}>card Content</div>
                            </Paper>

                        </div>
                        <Popover
                            open={Boolean(this.state.card4menu)}
                            anchorEl={this.state.card4menu}
                            onClose={() => this.menuclose('card4menu')}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            classes={{
                                paper: "py-8",
                            }}

                        >
                            <React.Fragment>
                                <MenuItem value={"1"} className={classes.menu} style={{ borderRadius: 0 }} onClick={() => { this.expandmenu() }}>Expand</MenuItem>
                                <MenuItem value={"2"} className={classes.menu} style={{ borderRadius: 0 }} onClick={() => { this.removemenu() }}>Remove</MenuItem>
                            </React.Fragment>

                        </Popover>
                    </div>
                </div>
            </div>
        )


    }
}



export default withStyles(styles, { withTheme: true })(DashboardApp);