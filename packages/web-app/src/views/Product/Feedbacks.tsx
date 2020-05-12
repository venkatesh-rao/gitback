import React from "react";
import { IProduct } from "../CreateProduct/types";
import { GET_PRODUCT_FEEDBACKS_QUERY } from "./query";
import { useQuery } from "@apollo/client";
import { GetProductFeedbacksData, GetProductFeedbacksVars } from "./types";
import Product from ".";
import {
  Formik,
  Form,
  FormikBag,
  Field,
  FieldProps,
  FormikProps,
} from "formik";

interface IFeedbacksProps {
  product: IProduct;
}

interface IFormValues {
  title: string;
  description: string;
}

const Feedbacks: React.FC<IFeedbacksProps> = ({ product }) => {
  const { data, loading, error } = useQuery<
    GetProductFeedbacksData,
    GetProductFeedbacksVars
  >(GET_PRODUCT_FEEDBACKS_QUERY, {
    variables: {
      productId: product.id,
    },
  });

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <p style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(error, null, 2)}</p>
    );
  }

  if (!data || !data.getProductFeedbacks) {
    return null;
  }

  const initialValues: IFormValues = { title: "", description: "" };

  return (
    <div className="max-w-full mx-auto lg:max-w-xl">
      {data.getProductFeedbacks.map((feedback) => {
        return (
          <div className="group transition duration-200 hover:bg-purple-500 bg-white shadow-md rounded-md p-4 my-4 cursor-pointer">
            <div className="text-xl mb-1 text-purple-500 group-hover:text-white font-semibold">
              {feedback.title}
            </div>
            <p className="text-md text-gray-800 group-hover:text-white">
              {feedback.description}
            </p>
          </div>
        );
      })}
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
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
                        className="block font-semibold text-xl mt-1 text-purple-500 w-full"
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
                        className="block mt-1 text-md text-gray-800 w-full resize-none"
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
                  className="duration-200 ease-in-out mt-4 text-gray-600 bg-transparentfont-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
    </div>
  );
};

export default Feedbacks;
