import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, GridColumn, List, ListItem } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";


export default observer(function ActvityDashboard() {

    const { activityStore } = useStore();
    const { openForm, selectedActivity, addEditMode } = activityStore;

    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityList></ActivityList>
            </GridColumn>
            <GridColumn width={6}>
                {
                    selectedActivity && !addEditMode &&
                    <ActivityDetails></ActivityDetails>
                }
                {
                    addEditMode && <ActivityForm selectedActivity={selectedActivity}></ActivityForm>
                }
            </GridColumn>
        </Grid>
    )
})
