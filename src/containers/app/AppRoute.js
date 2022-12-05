import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '~/router/PrivateRoute';
import PublicRoute from '~/router/PublicRoute';
import { appRoutes } from '~/router/index';
import FullPageLoading from '~/components/Loading/FullPageLoading/FullPageLoading';
import { useSelector } from 'react-redux';

function AppRoute() {
    const user = useSelector((state) => state?.user?.profile);
    console.log('routessss', appRoutes);
    return (
        <Suspense fallback={<FullPageLoading />}>
            <Switch>
                {appRoutes.map(({ component: Component, exact = true, path, isPrivate, role, ...rest }) => {
                    if (isPrivate) {
                        return (
                            <PrivateRoute
                                key={path}
                                component={Component}
                                exact={exact}
                                path={path}
                                role={role}
                                {...rest}
                            />
                        );
                    } else {
                        return (
                            <PublicRoute
                                key={path}
                                exact={exact}
                                role={role}
                                path={path}
                                component={Component}
                                {...rest}
                            />
                        );
                    }
                })}
            </Switch>
        </Suspense>
    );
}

export default AppRoute;
