import { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

// Layouts
import { InnerAppLayout } from '@/layouts';

import NewsDefaultView from './NewsDefaultView';
import NewsAddView from './NewsAddView';
import NewsEditView from './NewsEditView';

const NewsView: FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <InnerAppLayout
        mainContent={
          <Switch>
            <Route path={match.url} exact component={NewsDefaultView} />
            <Route path={`${match.url}/add`} component={NewsAddView} />
            <Route
              path={`${match.url}/edit/:news_id`}
              component={NewsEditView}
            />
          </Switch>
        }
      />
    </>
  );
};

export default NewsView;
