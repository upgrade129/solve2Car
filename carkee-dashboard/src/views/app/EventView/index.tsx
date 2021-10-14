import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import EventDefaultView from './EventDefaultView';
import EventAddView from './EventAddView';
import EventDetailView from './EventDetailView';
import EventDetailEdit from './EventDetailEdit';

const EventView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={EventDefaultView} />
      <Route path={`${match.url}/add`} component={EventAddView} />
      <Route path={`${match.url}/edit/:id`} component={EventDetailEdit} />
      <Route path={`${match.url}/:id`} component={EventDetailView} />
    </Switch>
  );
};

export default EventView;
