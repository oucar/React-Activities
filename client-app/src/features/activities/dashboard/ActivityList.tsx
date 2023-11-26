import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

// Always make sure that your compoenents are observer of the store
export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { selectActivity, deleteActivity, activitiesByDate, loading } = activityStore;

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
        {activitiesByDate.map((activity) => (
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
                  loading={loading && target === activity.id}
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
});
