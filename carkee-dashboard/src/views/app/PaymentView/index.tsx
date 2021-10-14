import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import PaymentDefaultView from './PaymentDefaultView';
import PaymentAddView from './PaymentAddView';

const PaymentView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={PaymentDefaultView} />
      <Route path={`${match.url}/add`} component={PaymentAddView} />
    </Switch>
  );
};

export default PaymentView;
