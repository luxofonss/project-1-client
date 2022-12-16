import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import FullPageLoading from '~/components/Loading/FullPageLoading/FullPageLoading';
import { appRoutes } from '~/router/index';
import PrivateRoute from '~/router/PrivateRoute';
import PublicRoute from '~/router/PublicRoute';

function AppRoute() {
    console.log('app route running');
    return (
        <Suspense fallback={<FullPageLoading />}>
            <Switch>
                {appRoutes.map(({ component: Component, exact = true, path, isPrivate, role, ...rest }) => {
                    if (!isPrivate) {
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
                    } else {
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
                    }
                })}
            </Switch>
        </Suspense>
    );
}

export default AppRoute;
