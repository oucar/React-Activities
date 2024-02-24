import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import CustomTextInput from "@src/app/common/form/CustomTextInput";
import { useStore } from "@src/app/stores/store";
import { theme } from "@src/app/common/colors/theme";

// When using store - always make the component an observer
export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch(() => setErrors({ error: "Invalid email or password!" }))
      }
    >
      {/* TODO: CUSTOMIZE THIS FURTHER IN THE FUTURE */}
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to Reactivities"
            textAlign="center"
            style={{ color: theme.colors.primary }}
          />
          <CustomTextInput name="email" placeholder="Email" />
          <CustomTextInput
            name="password"
            placeholder="Password"
            type="password"
          />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
            style={{ backgroundColor: theme.colors.positiveGreen }}
          />
        </Form>
      )}
    </Formik>
  );
});
