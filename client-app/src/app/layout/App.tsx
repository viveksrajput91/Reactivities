import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActvityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import Loading from './loading';

function App() {
  const {activityStore}= useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if(activityStore.initialLoading){
    return <Loading></Loading>
  }

  return (
    <>
      <NavBar></NavBar>
      <Container style={{ marginTop: '7em' }}>
        <ActvityDashboard></ActvityDashboard>
      </Container>
    </>
  );
}

export default observer(App);
