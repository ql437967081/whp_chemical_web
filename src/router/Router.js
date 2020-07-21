import React from 'react';
import { HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import Admin from "../user/Admin";
import AdminRoute from "./AdminRoute";

export default function Router() {
    return (
        <HashRouter>
            <div>
                <Switch>
                    <Route path={'/admin'}>
                        <Admin>
                            <AdminRoute />
                        </Admin>
                    </Route>
                    <Route path={'/login'}>
                        <Login />
                    </Route>
                    <Redirect to={'/login'} />
                </Switch>
            </div>
        </HashRouter>
    );
}

function Login() {
    return (
        <ul>
            <li>
                <Link to={'/admin'}>管理员登录</Link>
            </li>
        </ul>
    );
}
