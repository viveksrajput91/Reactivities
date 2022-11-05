import { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

export default function ActivityList() {

    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        <>
            {groupedActivities.map(([keyDate, activities]) => (
                <Fragment key={keyDate}>
                    <Header sub color="teal">
                        {keyDate}
                    </Header>
                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity}></ActivityListItem>
                    ))}
                </Fragment>
            ))}
        </>

    )
}