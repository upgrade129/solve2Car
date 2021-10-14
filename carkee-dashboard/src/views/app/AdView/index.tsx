import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import AdDefaultView from './AdDefaultView';
import AdAddView from './AdAddView';
import AdDetailEdit from './AdDetailEdit';
import AdDetailView from './AdDetailView';

const AdView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={AdDefaultView} />
      <Route path={`${match.url}/add`} component={AdAddView} />
      <Route path={`${match.url}/edit/:id`} component={AdDetailEdit} />
      <Route path={`${match.url}/:id`} component={AdDetailView} />
    </Switch>
  );
};

export default AdView;
