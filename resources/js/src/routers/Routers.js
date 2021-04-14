import React from 'react';
import { Router, Switch } from 'react-router';
import GetWebSite from '../components/websiteContent/GetWebSite';

function Routers(props) {
    return (
        <div>
            123
            <Switch>
                <Router exact path="/" component={GetWebSite} />
            </Switch>
        </div>
    );
}

export default Routers;