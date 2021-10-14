import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import ClubDefaultView from './ClubDefaultView';
import ClubDetailView from './ClubDetailView';

const PaymentView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={ClubDefaultView} />
      <Route path={`${match.url}/:id`} component={ClubDetailView} />
    </Switch>
  );
};

export default PaymentView;
