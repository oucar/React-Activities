import { Fragment } from "react";
import { Segment, Button, Placeholder } from "semantic-ui-react";
import { theme } from "../../../app/common/colors/theme";

export default function ActivityListItemPlaceholder() {
  return (
    <Fragment>
      <Placeholder fluid style={{ marginTop: 25 }}>
        <Segment.Group>
          <Segment style={{ minHeight: 110 }}>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
          <Segment>
            <Placeholder>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          </Segment>
          <Segment secondary style={{ minHeight: 70 }} />
          <Segment clearing>
            <Button disabled floated="right" content="View" positive style={{ backgroundColor: theme.colors.positiveGreen }}/>
          </Segment>
        </Segment.Group>
      </Placeholder>
    </Fragment>
  );
}
