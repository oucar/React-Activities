import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "@src/app/stores/store";
import LoadingComponent from "@src/app/layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent content={""} />;

  return (
    // https://react.semantic-ui.com/collections/grid/
    // Grid in Semantic UI can be divined into 16 columns
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat activityId={activity.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  );
});
