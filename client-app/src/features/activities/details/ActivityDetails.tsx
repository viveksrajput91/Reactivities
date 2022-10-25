import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import Loading from "../../../app/layout/loading";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";


export default function ActivityDetails() {
    const {activityStore}=useStore();
    const {selectedActivity:activity}=activityStore;
    if(!activity) return <Loading></Loading>
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color="blue" onClick={()=>activityStore.openForm(activity.id)} content="Edit"></Button>
                    <Button basic color="grey" onClick={()=>activityStore.cancelSelectedActivity()} content="Cancel"></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}