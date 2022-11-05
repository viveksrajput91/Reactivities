import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid, GridColumn, Image } from "semantic-ui-react";
import Loading from "../../../app/layout/loading";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default  observer(function ActivityDetails() {
    const {activityStore}=useStore();
    const {selectedActivity:activity,initialLoading,loadActivity}=activityStore;
    const {id} = useParams<{id:string}>();

    useEffect(()=>{
        if(id) loadActivity(id);
    },[id,loadActivity])

    if(initialLoading || !activity) return <Loading></Loading>

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}></ActivityDetailedHeader>
                <ActivityDetailedInfo activity={activity}></ActivityDetailedInfo>
                <ActivityDetailedChat></ActivityDetailedChat>
            </Grid.Column>
            <GridColumn width={6}>
                <ActivityDetailedSidebar></ActivityDetailedSidebar>
            </GridColumn>
        </Grid>
    )
})