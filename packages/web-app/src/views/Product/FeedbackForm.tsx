import React from "react";
import {
  Formik,
  Form,
  FormikBag,
  Field,
  FieldProps,
  FormikProps,
  FormikHelpers,
} from "formik";

interface IFeedbackFormProps {
  onSubmit: (values: IFormValues, actions: FormikHelpers<IFormValues>) => void;
}

export interface IFormValues {
  title: string;
  description: string;
}

const FeedbackForm: React.FC<IFeedbackFormProps> = (props) => {
  const initialValues: IFormValues = { title: "", description: "" };

  return (
    <Formik initialValues={initialValues} onSubmit={props.onSubmit}>
      {(_formProps: FormikProps<IFormValues>) => {
        return (
          <Form className="block w-full bg-white shadow-md rounded-md p-4 my-4">
            <Field name="title">
              {({ field }: FieldProps) => {
                return (
                  <div className="mb-2">
                    <label className="text-gray-500 text-xs font-semibold">
                      Title
                    </label>
                    <input
                      className="block bg-white font-semibold text-xl mt-1 text-purple-500 w-full"
                      placeholder="Feedback title"
                      {...field}
                    />
                  </div>
                );
              }}
            </Field>
            <Field name="description">
              {({ field }: FieldProps) => {
                return (
                  <>
                    <label className="text-gray-500 text-xs font-semibold">
                      Description
                    </label>
                    <textarea
                      className="block mt-1 bg-white text-md text-gray-800 w-full resize-none"
                      placeholder="A brief description about your feedback"
                      {...field}
                    />
                  </>
                );
              }}
            </Field>
            <div className="flex justify-end">
              <button
                type="reset"
                className="duration-200 ease-in-out mt-4 text-gray-600 bg-transparent font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Clear
              </button>
              <button
                type="submit"
                className="duration-200 ease-in-out mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Post
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FeedbackForm;
