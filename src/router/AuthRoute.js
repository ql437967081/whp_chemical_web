import React from 'react';
import { message } from 'antd';
import { Redirect, Route } from 'react-router-dom';
import { loginProps } from './config';

export default function AuthRoute({ nickname, ...rest }) {
    const checkLogin = () => {
        for (let prop of loginProps) {
            if (!sessionStorage.getItem(prop))
                return false;
        }
        return sessionStorage.getItem('nickname') === nickname;
    };

    if (checkLogin())
        return <Route {...rest} />;

    message.error('请先登录系统！');
    return <Redirect to={'/login'} />;
}
