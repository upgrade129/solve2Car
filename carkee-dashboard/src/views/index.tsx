import { FC } from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { DirectionType } from 'antd/lib/config-provider';

// Configs
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from '@/configs/app';

// Types
import { RootState } from '@/types/redux';

// Lang
import AppLocale from '@/lang';

// Views
import AppView from '@/views/app';
import AuthView from '@/views/auth';

// Custom Hooks
import useBodyClass from '@/hooks/useBodyClass';
import { useEffect } from 'react';
import { getUser } from '@/redux/actions/auth';

interface RouteInterceptorProps extends RouteProps {
  isAuthenticated: boolean;
}

export const RouteInterceptor: FC<RouteInterceptorProps> = ({
  children,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: AUTH_PREFIX_PATH,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

// interface ViewsProps {
//   locale: string;
//   token: string;
//   location: string;
//   direction: string;
// }

export const Views: FC<RouteComponentProps> = (props) => {
  const { location, history, match } = props;
  const { locale, direction } = useSelector((state: RootState) => state.theme);
  const { token } = useSelector((state: RootState) => state.auth);
  const currentAppLocale = (AppLocale as { [key: string]: any })[locale];

  useBodyClass(`dir-${direction}`);

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [token, dispatch]);

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider
        locale={currentAppLocale.antd}
        direction={direction as DirectionType}
      >
        <Switch>
          <Route path={AUTH_PREFIX_PATH} component={AuthView} />

          <RouteInterceptor
            path={APP_PREFIX_PATH}
            isAuthenticated={Boolean(token)}
          >
            <AppView location={location} history={history} match={match} />
          </RouteInterceptor>

          <Route exact path={`/`}>
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  );
};

export default Views;
