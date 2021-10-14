import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import AdminDefaultView from './AdminDefaultView';
import AdminAddView from './AdminAddView';
import AdminEditView from './AdminEditView';
import AdminDetailView from './AdminDetailView';

const AdminView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={AdminDefaultView} />
      <Route path={`${match.url}/edit/:id`} component={AdminEditView} />
      <Route path={`${match.url}/add`} component={AdminAddView} />
      <Route path={`${match.url}/:id`} component={AdminDetailView} />
    </Switch>
  );
};

export default AdminView;
