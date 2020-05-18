import React from "react";
import {
  Formik,
  Form,
  Field,
  FieldProps,
  FormikProps,
  FormikHelpers,
} from "formik";

import * as Yup from "yup";

interface IFeedbackFormProps {
  onSubmit: (values: IFormValues, actions: FormikHelpers<IFormValues>) => void;
}

export interface IFormValues {
  title: string;
  description: string;
}

const FeedbackSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  desciption: Yup.string(),
});

const FeedbackForm: React.FC<IFeedbackFormProps> = (props) => {
  const initialValues: IFormValues = { title: "", description: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={FeedbackSchema}
    >
      {(formProps: FormikProps<IFormValues>) => {
        const isInvalid = !formProps.dirty || !formProps.isValid;

        return (
          <Form className="block w-full bg-purple-100 border-2 border-dashed border-gray-500 rounded-md p-4 my-4">
            <Field name="title">
              {({ field }: FieldProps) => {
                return (
                  <div className="mb-2">
                    <label className="text-gray-500 text-xs font-semibold">
                      Title
                    </label>
                    <input
                      className="block bg-purple-100 font-semibold text-xl mt-1 text-purple-500 w-full outline-none"
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
                      className="block mt-1 bg-purple-100 text-md text-gray-800 w-full resize-none outline-none"
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
                className={`duration-200 ease-in-out mt-4 bg-transparent font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  formProps.dirty ? "text-gray-600" : "text-gray-500"
                }`}
              >
                Clear
              </button>
              <button
                type="submit"
                className={`duration-200 ease-in-out mt-4 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isInvalid
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "cursor-pointer bg-purple-600 hover:bg-purple-700 text-white"
                }`}
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
