import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import ChemicalManage from '../page/chemical/ChemicalManage';
import AlarmManage from '../page/alarm/AlarmManage';

export default function AdminRoute() {
    const basePath = '/admin';
    return (
        <Switch>
            <Route path={`${basePath}/option:optionId`}>
                <Option />
            </Route>
            <Route path={`${basePath}/chemical_manage`}>
                <ChemicalManage />
            </Route>
            <Route path={`${basePath}/alarm_manage`}>
                <AlarmManage />
            </Route>
            <Route path={basePath}>
                <Home />
            </Route>
        </Switch>
    );
}

function Option() {
    let { optionId } = useParams();
    return <h3>option {optionId}</h3>;
}

function Home() {
    return <h3>欢迎来到whp管理系统</h3>
}

