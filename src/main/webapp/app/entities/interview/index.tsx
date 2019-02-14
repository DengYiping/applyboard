import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Interview from './interview';
import InterviewDetail from './interview-detail';
import InterviewUpdate from './interview-update';
import InterviewDeleteDialog from './interview-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InterviewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InterviewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InterviewDetail} />
      <ErrorBoundaryRoute path={match.url} component={Interview} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={InterviewDeleteDialog} />
  </>
);

export default Routes;
