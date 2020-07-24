import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import ChemicalManage from '../page/chemical/ChemicalManage';

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
        </Switch>
    );
}

function Option() {
    let { optionId } = useParams();
    return <h3>option {optionId}</h3>;
}

