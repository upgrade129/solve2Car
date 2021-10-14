import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import AccountDefaultView from './AccountDefaultView';
import AccountDetailView from './AccountDetailView';
import AccountEditView from './AccountEditView';
import AccountAdminView from './AccountAdminView';

const AccountView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={AccountDefaultView} />
      <Route
        path={`${match.url}/edit/:account_id`}
        component={AccountEditView}
      />
      <Route
        path={`${match.url}/admins/:account_id`}
        component={AccountAdminView}
      />
      <Route path={`${match.url}/:account_id`} component={AccountDetailView} />
    </Switch>
  );
};

export default AccountView;
