import React from "react";
import { Grid, GridColumn, List, ListItem } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities:Activity[];
    selectActivity: (id:string)=>void;
    selectedActivity : Activity | undefined;
    cancelSelectActivity:() => void;
    addEditMode:boolean;
    formOpen: (id:string)=>void;
    formClose: () => void;
    addOrEditActivity: (activity:Activity) => void;
    deleteActivity:(id:string)=>void;
    submitting:boolean;
}

export default function ActvityDashboard({activities,selectActivity,cancelSelectActivity,
                                            selectedActivity,addEditMode,formOpen,formClose,
                                            addOrEditActivity,deleteActivity,submitting}:Props) {
    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityList submitting={submitting} deleteActivity={deleteActivity} selectActivity ={selectActivity} activities={activities}></ActivityList>
            </GridColumn>
            <GridColumn width={6}>
                {selectedActivity && !addEditMode && 
                <ActivityDetails formOpen = {formOpen} cancelSelectActivity={cancelSelectActivity} activity={selectedActivity}></ActivityDetails>}
                {addEditMode && <ActivityForm submitting={submitting} addOrEditActivity={addOrEditActivity} formClose={formClose} selectedActivity={selectedActivity}></ActivityForm>}
            </GridColumn>
        </Grid>
    )
}
