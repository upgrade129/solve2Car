import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

// Layouts
import { InnerAppLayout } from '@/layouts';

import BannerDefaultView from './BannerDefaultView';
import BannerAddView from './BannerAddView';
import BannerEditView from './BannerEditView';

const BannerView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <InnerAppLayout
        mainContent={
          <Switch>
            <Route exact path={match.url} component={BannerDefaultView} />
            <Route path={`${match.url}/add`} component={BannerAddView} />
            <Route path={`${match.url}/edit/:id`} component={BannerEditView} />
          </Switch>
        }
      />
    </>
  );
};

export default BannerView;
