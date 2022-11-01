import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import Loading from "../../../app/layout/loading";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid} from 'uuid';

export default observer(function ActivityForm(){

    const {activityStore}= useStore();
    const {createActivity, initialLoading, loadActivity, updateActivity,loading}= activityStore;
    const {id}=useParams<{id:string}>();
    const history = useHistory();
    const [activity,setActivity]=useState({
        id:'',
        title:'',
        description:'',
        category:'',
        date:'',
        city:'',
        venue:''
    });

    useEffect(()=>{
        if(id) loadActivity(id).then(activity => setActivity(activity!));
    },[id, loadActivity])

    function onchangeInput(evnt:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const {name,value}=evnt.target;
        setActivity({...activity,[name]:value});
    }

    function handleSubmit()
    {
        if(activity.id.length===0)
        {
            let newActivity = {
                ...activity,
                id : uuid()
            }
            createActivity(newActivity).then(()=>{
                history.push(`activities/${newActivity.id}`);
            })
        }
        else
        {
            updateActivity(activity);
            history.push(`/activities/${activity.id}`);
        }
    }

    if(initialLoading && id) return <Loading></Loading>;

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" name='title' value={activity.title} onChange={onchangeInput}></Form.Input>
                <Form.TextArea placeholder="Description" name='description' value={activity.description} onChange={onchangeInput}/>
                <Form.Input placeholder="Category" name='category' value={activity.category} onChange={onchangeInput}></Form.Input>
                <Form.Input type="date" placeholder="Date" name='date' value={activity.date} onChange={onchangeInput}></Form.Input>
                <Form.Input placeholder="City" name='city' value={activity.city} onChange={onchangeInput}></Form.Input>
                <Form.Input placeholder="Venue" name='venue' value={activity.venue} onChange={onchangeInput}></Form.Input>
                <Button loading={loading} positive floated="right" type="submit" content="Submit"></Button>
                <Button as={Link} to='/activities' floated="right" type="button" content="Cancel"></Button>
            </Form>
        </Segment>
    )
})