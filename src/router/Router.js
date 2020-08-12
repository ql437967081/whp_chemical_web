import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from '../user/Login';
import Admin from '../user/Admin';
import AuthRoute from './AuthRoute';
import AdminRoute from './AdminRoute';
import { adminNickName } from './config';

export default function Router() {
    return (
        <HashRouter>
            <Switch>
                <AuthRoute path={'/admin'} nickname={adminNickName}>
                    <Admin>
                        <AdminRoute />
                    </Admin>
                </AuthRoute>
                <Route path={'/login'}>
                    <Login />
                </Route>
                <Redirect to={'/login'} />
            </Switch>
        </HashRouter>
    );
}
