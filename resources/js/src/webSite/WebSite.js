import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LayoutHome from '../components/layout/LayoutHome';
import Login from '../components/login/Login';
import Register from '../components/register/Register';

const WebSite = props => {


    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route path="/" component={LayoutHome} />
            </Switch>
        </BrowserRouter>
    );
};

WebSite.propTypes = {

};

export default WebSite;