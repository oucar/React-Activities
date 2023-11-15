import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

// props we got from App.tsx
interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  // these are functions that we're passing down here
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
}

// destructing activities object from Props
export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
}: Props) {
  return (
    <Grid>
      {/* Semantic UI has its grid in 16 columns and not 12! */}
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity}/>
      </Grid.Column>
      <Grid.Column width="6">
        {/* anything to the right of this will be executed as long as it's truthy */}
        {selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
          />
        )}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
}
