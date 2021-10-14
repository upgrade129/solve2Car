import { FC, Suspense } from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import Loading from '@/components/shared/Loading';

interface PageRouterProps {
  routes: any[];
  from: any;
  to: any;
  align: any;
  cover: any;
}

const PageRouter: FC<PageRouterProps> = ({
  routes,
  from,
  to,
  align,
  cover,
}) => {
  const { url } = useRouteMatch();

  return (
    <Suspense fallback={<Loading align={align} cover={cover} />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={`${url}/${route.path}`}
            component={route.component}
          />
        ))}
        <Redirect from={from} to={to} />
      </Switch>
    </Suspense>
  );
};

export default PageRouter;
