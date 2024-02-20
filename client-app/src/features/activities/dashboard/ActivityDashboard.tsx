import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

// destructing activities object from Props
export default observer(function ActivityDashboard() {
  // destructure the activityStore from the MobX store
  const { activityStore } = useStore();
  const { loadActivities, setPagingParams, pagination } = activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  // DEBUG: WILL BE REPLACED WITH PAGINATION
  // // load activities when the component mounts
  // useEffect(() => {
  //   if (activityRegistry.size <= 1) {
  //     loadActivities();
  //   }
  //   // The effect will only re-run if the dependencies have changed since the last render
  //   // Here, the dependencies are loadActivities and the size of activityRegistry.
  //   // This means the effect will re-run whenever either of them changes.
  // }, [loadActivities, activityRegistry.size]);
  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Grid>
      {/* Semantic UI has its grid in 16 columns and not 12! */}
      <Grid.Column width="10">
        {activityStore.loadingInitial && !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width="10">
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
