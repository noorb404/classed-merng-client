import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext} from '../context/auth';

export function LoggedInRoute({component : Component, ...rest}){
    const {user} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render = {props => user ? <Redirect to='/' /> : <Component {...props} />}
        />
    );
}
export function LoggedOutRoute({component : Component, ...rest}){
    const {user} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render = {props => !user ? <Redirect to='/login' /> : <Component {...props} />}
        />
    );
}
