import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from 'yup';
import CustomTextArea from "@src/app/common/form/CustomTextArea";
import CustomTextInput from "@src/app/common/form/CustomTextInput";
import { useStore } from "@src/app/stores/store";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {
    const { profileStore: { profile, updateProfile } } = useStore();
    return (
        <Formik
            initialValues={{
                displayName: profile?.displayName, 
                bio: profile?.bio || ''
            }}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })} >
            {({ isSubmitting, isValid, dirty }) => (
                <Form className='ui form'>
                    <CustomTextInput 
                        placeholder='Display Name'
                        name='displayName' 
                    />
                    <CustomTextArea rows={3} placeholder='Add your bio' name='bio' />
                    <Button
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content='Update profile'
                        floated='right'
                        disabled={!isValid || !dirty}
                    /> 
                </Form>
            )} 
        </Formik>
    )
})