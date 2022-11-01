import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import Loading from "../../../app/layout/loading";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";


export default observer(function ActvityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
      }, [activityRegistry.size,loadActivities])
    
      if(activityStore.initialLoading){
        return <Loading></Loading>
      }

    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityList></ActivityList>
            </GridColumn>
            <GridColumn width={6}>
                <h2>Activities Filter</h2>
            </GridColumn>
        </Grid>
    )
})
