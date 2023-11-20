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
  editMode: boolean;

  // these are functions that we're passing down here
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
  closeForm: () => void;
}

// destructing activities object from Props
export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
}: Props) {
  return (
    <Grid>
      {/* Semantic UI has its grid in 16 columns and not 12! */}
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {/* anything to the right of this will be executed as long as it's truthy */}
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm closeForm={closeForm} activity={selectedActivity} />
        )}
      </Grid.Column>
    </Grid>
  );
}
