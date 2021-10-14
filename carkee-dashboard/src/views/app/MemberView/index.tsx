import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import MemberDefaultView from './MemberDefaultView';
import MemberDetailView from './MemberDetailView';
import MemberEditView from './MemberEditView';

const MemberView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={match.url} exact component={MemberDefaultView} />
      <Route path={`${match.url}/edit/:member_id`} component={MemberEditView} />
      <Route path={`${match.url}/:member_id`} component={MemberDetailView} />
    </Switch>
  );
};

export default MemberView;
