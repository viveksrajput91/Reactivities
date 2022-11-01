import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Item, ItemContent, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

export default function ActivityList() {

    const [target, setTarget] = useState('');
    const {activityStore}=useStore();
    const {deleteActivity,loading,activitiesSortByDate:activities}=activityStore;

    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string)
    {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {
                activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue"></Button>
                                <Button
                                    name={activity.id}
                                    loading={loading && target===activity.id}
                                    onClick={(e) => handleActivityDelete(e,activity.id)}
                                    floated="right"
                                    content="Delete"
                                    color="red"></Button>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}