import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react";
import { theme } from "../../../app/common/colors/theme";

// Always make sure that your compoenents are observer of the store
export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub style={{ color: theme.colors.primary }}>
            {group}
          </Header>
          {activities.map((activity) => (
            // Passing activity down as the prop
            <ActivityListItem activity={activity} key={activity.id} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
