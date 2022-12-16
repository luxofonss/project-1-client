import { TOKEN_KEY } from '~/app-configs';
import { REQUEST_STATE } from '~/app-configs';
import FullPageLoading from '~/components/Loading/FullPageLoading/FullPageLoading';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { CHECK_VALID_TOKEN_FAIL, RESET_CHECK_VALID_TOKEN } from '~/redux/actions/user';
import { CHECK_VALID_TOKEN } from '~/redux/actions/user';

function PrivateRoute({ component: Component, location, role, ...rest }) {
    console.log('private route runningggg');
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.user?.profile?.role);
    const isAuthenticated = useSelector((state) => state.user?.verifyAuthState);
    console.log(userRole);
    useEffect(() => {
        (async () => {
            const accessToken = localStorage.getItem(TOKEN_KEY);
            if (accessToken) {
                if (isAuthenticated !== REQUEST_STATE.SUCCESS) {
                    dispatch(CHECK_VALID_TOKEN());
                }
            } else {
                dispatch(CHECK_VALID_TOKEN_FAIL());
            }
        })();
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated === REQUEST_STATE.ERROR) {
            dispatch(RESET_CHECK_VALID_TOKEN());
        }
    }, [isAuthenticated]);

    console.log('isAuthenticated', isAuthenticated);

    switch (isAuthenticated) {
        case REQUEST_STATE?.SUCCESS: {
            if (userRole)
                if (role === userRole || role === '')
                    return <Route {...rest} render={(props) => <Component {...props} />} />;
                else return <Redirect to={{ pathname: '/page-not-found', state: { from: location } }} />;
        }
        case REQUEST_STATE?.ERROR:
            return <Redirect to={{ pathname: '/auth', state: { from: location } }} />;
        default:
            return <FullPageLoading />;
    }
}

export default PrivateRoute;
