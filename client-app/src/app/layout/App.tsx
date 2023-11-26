import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  // destructure the activityStore from the MobX store
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // load activities when the component mounts
  useEffect(() => {
    activityStore.loadActivities();
    // The effect will only re-run if the dependencies have changed since the last render
    // Here, the dependency is activityStore. This means the effect will re-run whenever activityStore changes
  }, [activityStore]);

  function handleDeleteActivity(id: string) {
    setIsSubmitting(true);
    // return anything but the id that was passed in
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setIsSubmitting(false);
    });
  }

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          deleteActivity={handleDeleteActivity}
          isSubmitting={isSubmitting}
        />
      </Container>
    </Fragment>
  );
}

// observer is a higher order component that wraps the App component
// and makes it an observer of the MobX store
// also, MobX doesn't support fast refresh
export default observer(App);
