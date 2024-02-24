import { observer } from "mobx-react-lite";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { format } from "date-fns";
import { Activity } from "@src/app/models/activity";
import { theme } from "@src/app/common/colors/theme";
interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedInfo({ activity }: Props) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" name="info" style={{ color: theme.colors.primary }} />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{activity.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" style={{ color: theme.colors.primary }} />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(activity.date!, "dd MMM yyyy h:mm aa")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" style={{ color: theme.colors.primary }} />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {activity.venue} - {activity.city}, {activity.state}
            </span>
          </Grid.Column>
          {/* TODO: ADD a detailed address grid!! */}
        </Grid>
      </Segment>
    </Segment.Group>
  );
});
