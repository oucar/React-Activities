import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

// props we got from App.tsx
interface Props {
  activities: Activity[];
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  isSubmitting: boolean;
}

// destructing activities object from Props
export default observer(function ActivityDashboard({
  activities,
  createOrEdit,
  deleteActivity,
  isSubmitting,
}: Props) {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      {/* Semantic UI has its grid in 16 columns and not 12! */}
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          isSubmitting={isSubmitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {/* anything to the right of this will be executed as long as it's truthy */}
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm
            createOrEdit={createOrEdit}
            isSubmitting={isSubmitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
});
