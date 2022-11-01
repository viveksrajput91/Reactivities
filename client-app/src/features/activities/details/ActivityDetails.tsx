import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import Loading from "../../../app/layout/loading";
import { useStore } from "../../../app/stores/store";

export default  observer(function ActivityDetails() {
    const {activityStore}=useStore();
    const {selectedActivity:activity,initialLoading,loadActivity}=activityStore;
    const {id} = useParams<{id:string}>();

    useEffect(()=>{
        if(id) loadActivity(id);
    },[id,loadActivity])

    if(initialLoading || !activity) return <Loading></Loading>

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
                    <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content="Edit"></Button>
                    <Button as={Link} to="/activities" basic color="grey" content="Cancel"></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})