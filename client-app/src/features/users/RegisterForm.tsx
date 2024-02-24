import { ErrorMessage, Form, Formik } from "formik";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError";
import { theme } from "../../app/common/colors/theme";

// When using store - always make the component an observer
export default observer(function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {/* TODO: CUSTOMIZE THIS FURTHER IN THE FUTURE */}
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Register to Reactivities"
            textAlign="center"
            style={{ color: theme.colors.primary }}
          />
          <CustomTextInput name="displayName" placeholder="Display name" />
          <CustomTextInput name="username" placeholder="Username" />
          <CustomTextInput name="email" placeholder="Email" />
          <CustomTextInput
            name="password"
            placeholder="Password"
            type="password"
          />
          <ErrorMessage
            name="error"
            render={() => (
              <ValidationError errors={errors.error as unknown as string[]} />
            )}
          />
          <Button
            // dirty - if the form has been touched
            // isSubmitting - if the form is currently submitting
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
            style={{ backgroundColor: theme.colors.positiveGreen }}
          />
        </Form>
      )}
    </Formik>
  );
});
