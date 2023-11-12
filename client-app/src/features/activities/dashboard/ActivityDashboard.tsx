import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
}

// destructing activities object from Props
export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid>
      {/* Semantic UI has its grid in 16 columns and not 12! */}
      <Grid.Column width="10">
        <ActivityList activities={activities} />
      </Grid.Column>
    </Grid>
  );
}
