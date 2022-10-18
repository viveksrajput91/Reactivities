import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List, ListItem } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActvityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid} from 'uuid';
import agent from '../api/agent';
import Loading from './loading';
function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [addEditMode, setAddEditMode] = useState(false);
  const [loading,setLoading]=useState(true);
  const [submitting,setSubmitting]=useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      const activities:Activity[]=[];
      response.forEach(activity=>{
        activity.date=activity.date.split('T')[0];
        activities.push(activity);
      })
      console.log(activities);
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);
    if(activity.id)
    {
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=>x.id !==activity.id),activity]);
        setSelectedActivity(activity);
        setAddEditMode(false);
        setSubmitting(false);
      }).catch((error)=>{
        console.log(error);
      })
    }
    else
    {
      activity.id=uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity]);
        setSelectedActivity(activity);
        setAddEditMode(false);
        setSubmitting(false);
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  function handleDeleteActivity(id:string)
  {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id!==id)]);
      setSubmitting(false);
    })
    
  }

  if(loading){
    return(
      <Loading></Loading>
    )
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
         submitting={submitting}
         ></ActvityDashboard>
      </Container>
    </>
  );
}

export default App;
