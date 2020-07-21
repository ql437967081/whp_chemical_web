import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

export default function AdminRoute() {
    const basePath = '/admin';
    return (
        <Switch>
            <Route path={`${basePath}/option:optionId`}>
                <Option />
            </Route>
        </Switch>
    );
}

function Option() {
    let { optionId } = useParams();
    return <h3>option {optionId}</h3>;
}

