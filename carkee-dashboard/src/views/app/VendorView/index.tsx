import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import VendorDefaultView from './VendorDefaultView';
import VendorAddView from './VendorAddView';
import VendorEditView from './VendorEditView';

const VendorView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={match.url} exact component={VendorDefaultView} />
      <Route path={`${match.url}/edit/:vendor_id`} component={VendorEditView} />
      <Route path={`${match.url}/add`} component={VendorAddView} />
    </Switch>
  );
};

export default VendorView;
