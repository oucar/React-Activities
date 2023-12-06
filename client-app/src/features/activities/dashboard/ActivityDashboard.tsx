import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// destructing activities object from Props
export default observer(function ActivityDashboard() {
  // destructure the activityStore from the MobX store
  const { activityStore } = useStore();

  // load activities when the component mounts
  useEffect(() => {
    activityStore.loadActivities();
    // The effect will only re-run if the dependencies have changed since the last render
    // Here, the dependency is activityStore. This means the effect will re-run whenever activityStore changes
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      {/* Semantic UI has its grid in 16 columns and not 12! */}
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
});
