import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List, ListItem } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActvityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid} from 'uuid';
function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [addEditMode, setAddEditMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id: String) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setAddEditMode(true);
  }

  function handleFormClose()
  {
    setAddEditMode(false);
  }

  function handleAddOrEditActivity(activity:Activity)
  {
    activity.id ? setActivities([...activities.filter(x=>x.id !==activity.id),activity])
    :setActivities([...activities,{...activity,id:uuid()}]);
  }

  function handleDeleteActivity(id:string)
  {
    setActivities([...activities.filter(x=>x.id!==id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}></NavBar>
      <Container style={{ marginTop: '7em' }}>
        <ActvityDashboard 
        selectActivity={handleSelectActivity} 
        cancelSelectActivity={handleCancelSelectActivity}
         selectedActivity={selectedActivity} 
         activities={activities}
         formOpen={handleFormOpen}
         formClose={handleFormClose}
         addEditMode={addEditMode}
         addOrEditActivity = {handleAddOrEditActivity}
         deleteActivity={handleDeleteActivity}
         ></ActvityDashboard>
      </Container>
    </>
  );
}

export default App;
