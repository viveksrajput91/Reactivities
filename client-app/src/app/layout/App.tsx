import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActvityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import Loading from './loading';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/homePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {

  const location = useLocation();

  return (
    <>
      <ToastContainer hideProgressBar position='bottom-right'></ToastContainer>
      <Route exact path="/" component={HomePage}></Route>
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar></NavBar>
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path="/activities" component={ActivityDashboard}></Route>
              <Route path="/errors" component={TestErrors}></Route>
              <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm}></Route>
              <Route path="/activities/:id" component={ActivityDetails}></Route>
              <Route path="/server-error" component={ServerError}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </Container>
        </>
      )}></Route>
    </>
  );
}

export default observer(App);
