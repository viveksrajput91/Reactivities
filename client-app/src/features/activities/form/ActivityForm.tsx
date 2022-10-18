import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
interface Props{
    formClose:()=>void;
    selectedActivity : Activity | undefined;
    addOrEditActivity: (activity:Activity) => void;
    submitting:boolean;
}
export default function ActivityForm({formClose,selectedActivity,addOrEditActivity,submitting}:Props){

    const initialState = selectedActivity ?? {
        id:'',
        title:'',
        description:'',
        category:'',
        date:'',
        city:'',
        venue:''
    };

    const [activity,setActivity]=useState(initialState);

    function onchangeInput(evnt:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const {name,value}=evnt.target;
        setActivity({...activity,[name]:value});
    }

    function handleSubmit()
    {
        addOrEditActivity(activity);
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" name='title' value={activity.title} onChange={onchangeInput}></Form.Input>
                <Form.TextArea placeholder="Description" name='description' value={activity.description} onChange={onchangeInput}/>
                <Form.Input placeholder="Category" name='category' value={activity.category} onChange={onchangeInput}></Form.Input>
                <Form.Input type="date" placeholder="Date" name='date' value={activity.date} onChange={onchangeInput}></Form.Input>
                <Form.Input placeholder="City" name='city' value={activity.city} onChange={onchangeInput}></Form.Input>
                <Form.Input placeholder="Venue" name='venue' value={activity.venue} onChange={onchangeInput}></Form.Input>
                <Button loading={submitting} positive floated="right" type="submit" content="Submit"></Button>
                <Button floated="right" type="button" onClick={formClose} content="Cancel"></Button>
            </Form>
        </Segment>
    )
}