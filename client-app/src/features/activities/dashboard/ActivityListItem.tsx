import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  const { activityStore } = useStore();
  const { deleteActivity, loading } = activityStore;

  const [target, setTarget] = useState("");

  function handleActivityDelete(
    // SyntheticEvent is a generic type (better than any in this situation as it provides more type safety)
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }
  return (
    <Item key={activity.id}>
      <Item.Content>
        <Item.Header as="a">{activity.title}</Item.Header>
        <Item.Meta>{activity.date}</Item.Meta>
        <Item.Description>
          <div>{activity.description}</div>
          <div>{activity.venue}</div>
          <div>
            {activity.city}, {activity.state}
          </div>
        </Item.Description>
        <Item.Extra>
          {/* Doesn't immidieatly emitates clicking the button event  */}
          {/* And wait for us to actually click it */}
          <Button
            // as we will navigate away from the page, we can use the button as a link
            as={Link}
            to={`/activities/${activity.id}`}
            floated="right"
            content="View"
            color="blue"
          />
          <Button
            onClick={(event) => handleActivityDelete(event, activity.id)}
            name={activity.id}
            loading={loading && target === activity.id}
            floated="right"
            content="Delete"
            color="red"
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
