import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

export default function CustomTextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    // !!meta.error means if there is an error, it will return true, otherwise false.
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
