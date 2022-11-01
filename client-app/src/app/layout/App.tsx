import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActvityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import Loading from './loading';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/homePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {

  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage}></Route>
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar></NavBar>
          <Container style={{ marginTop: '7em' }}>
            <Route exact path="/activities" component={ActivityDashboard}></Route>
            <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm}></Route>
            <Route path="/activities/:id" component={ActivityDetails}></Route>
          </Container>
        </>
      )}></Route>
    </>
  );
}

export default observer(App);
