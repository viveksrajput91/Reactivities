import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Label, Segment } from "semantic-ui-react";
import Loading from "../../../app/layout/loading";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";

export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { createActivity, initialLoading, loadActivity, updateActivity, loading } = activityStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: null,
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])

    const validationSchama = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required(),
        category: Yup.string().required(),
        date: Yup.string().required("Date is required").nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })
    // function handleChange(evnt:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    // {
    //     const {name,value}=evnt.target;
    //     setActivity({...activity,[name]:value});
    // }

    function handleFormSubmit(activity:Activity)
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

    if (initialLoading && id) return <Loading></Loading>;

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchama}
                enableReinitialize
                initialValues={activity}
                onSubmit={value => handleFormSubmit(value)}>
                {({ handleSubmit,isValid,dirty,isSubmitting }) => (
                    <Form className="ui form" onSubmit={handleSubmit}>
                        <MyTextInput placeholder="Title" name="title"></MyTextInput>
                        <MyTextArea placeholder="Description" name="description" rows={3}></MyTextArea>
                        <MyTextInput placeholder="Category" name='category'></MyTextInput>
                        <MyDateInput
                            placeholderText="Date"
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa' />
                        <MyTextInput placeholder="City" name='city'></MyTextInput>
                        <MyTextInput placeholder="Venue" name='venue'></MyTextInput>
                        <Button disabled={!isValid || !dirty || isSubmitting} loading={loading} positive floated="right" type="submit" content="Submit"></Button>
                        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel"></Button>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})