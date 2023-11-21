import { SyntheticEvent, useState } from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
  activities: Activity[];
  // from ActivityDashboard.tsx
  // these are functions that we're passing down here
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  isSubmitting: boolean;
}

export default function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
  isSubmitting,
}: Props) {
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
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
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
                  onClick={() => selectActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={(event) => handleActivityDelete(event, activity.id)}
                  name={activity.id}
                  loading={isSubmitting && target === activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
