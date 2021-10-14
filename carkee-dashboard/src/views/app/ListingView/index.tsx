import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import ListingDefaultView from './ListingDefaultView';

const ListingView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={match.url} exact component={ListingDefaultView} />
    </Switch>
  );
};

export default ListingView;
