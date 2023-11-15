import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function ActivityForm() {
  return (
    // the clearing attribute on a Segment component is used to automatically
    //  clear floated content within the segment.
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input placeholder="Date" />
        <Form.Input placeholder="State" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button floated="right" type="button" content="Cancel" />

      </Form>
    </Segment>
  );
}
