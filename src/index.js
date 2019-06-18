import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import jssExtend from 'jss-extend';
import history from './history';
import './index.css';
import DashboardApp from './charts/DashboardApp';
import ChartApp from './charts/charApp';
import * as serviceWorker from './serviceWorker';


const jss = create({
    ...jssPreset(),
    plugins: [...jssPreset().plugins, jssExtend()]
});

jss.options.insertionPoint = document.getElementById('jss-insertion-point');
const generateClassName = createGenerateClassName();


ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
        <Router history={history}>
            <Route path='/' exact
                component={() => <ChartApp history={history} />}
            />
            <Route path='/home' exact
                component={() => <ChartApp history={history} />}
            />
            <Route path='/dashboard' exact
                component={() => <DashboardApp history={history} />}
            />
        </Router>
    </JssProvider>
    , document.getElementById('root')
);

serviceWorker.unregister();
