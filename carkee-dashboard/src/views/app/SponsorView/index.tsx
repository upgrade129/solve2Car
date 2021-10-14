import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import SponsorDefaultView from './SponsorDefaultView';

const SponsorView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={match.url} exact component={SponsorDefaultView} />
    </Switch>
  );
};

export default SponsorView;
