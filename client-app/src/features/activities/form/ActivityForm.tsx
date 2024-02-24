import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivityFormValues } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import CustomTextInput from "../../../app/common/form/CustomTextInput";
import CustomTextArea from "../../../app/common/form/CustomTextArea";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import CustomDateInput from "../../../app/common/form/CustomDateInput";
import "react-datepicker/dist/react-datepicker.css";
import { theme } from "../../../app/common/colors/theme";

// Since Loading is an observable we have in activityStore,
// The whole component function needs to be an observable.
export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    activityStore;

  // getting the id from the parameters
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required("The activity category is required"),
    date: Yup.string().required("The activity date is required"),
    city: Yup.string().required("The activity city is required"),
    state: Yup.string().required("The activity state is required"),
    venue: Yup.string().required("The activity venue is required"),
  });

  function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        navigate(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  }

  // useEffect hook is used to load an activity when the component mounts or when the id or loadActivity function changes.
  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) =>
        setActivity(new ActivityFormValues(activity))
      );
  }, [id, loadActivity]);

  // if the loadingInitial is true, we return a loading component
  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    // the clearing attribute on a Segment component is used to automatically
    //  clear floated content within the segment.
    <Segment clearing>
      <Header
        content="Activity Details"
        sub
        style={{ color: theme.colors.primary }}
      />
      <Formik
        // Enabling reinitialization will reset the form to the initial values when the enableReinitialize prop is changed.
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {/* dirty prop is used to check if the form has been changed */}
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <CustomTextInput name="title" placeholder="Title" />
            <CustomTextArea
              rows={3}
              placeholder="Description"
              name="description"
            />
            <CustomSelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            {/* TODO: Fix type='date' */}
            <CustomDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat={"MMMM d yyyy h:mm aa"}
            />
            <Header
              content="Location Details"
              sub
              style={{ color: theme.colors.primary }}
            />
            <CustomTextInput placeholder="City" name="city" />
            <CustomTextInput placeholder="State" name="state" />
            <CustomTextInput placeholder="Venue" name="venue" />

            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
              style={{ backgroundColor: theme.colors.positiveGreen }}
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
