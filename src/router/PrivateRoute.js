import { TOKEN_KEY } from '~/app-configs';
import { REQUEST_STATE } from '~/app-configs';
import FullPageLoading from '~/components/Loading/FullPageLoading/FullPageLoading';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { CHECK_VALID_TOKEN_FAIL } from '~/redux/actions/user';
import { CHECK_VALID_TOKEN } from '~/redux/actions/user';

function PrivateRoute({ component: Component, location, ...rest }) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user?.verifyAuthState);
    const userRole = useSelector((state) => state.user?.profile?.role);
    console.log('isAuthenticated', isAuthenticated);
    console.log('user role: ', userRole);
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
    switch (isAuthenticated) {
        case REQUEST_STATE?.SUCCESS:
            return <Route {...rest} render={(props) => <Component {...props} />} />;
        case REQUEST_STATE?.ERROR:
            return <Redirect to={{ pathname: '/auth', state: { from: location } }} />;
        default:
            return <FullPageLoading />;
    }
}

export default PrivateRoute;
