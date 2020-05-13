import React from "react";
import { IProduct } from "../CreateProduct/types";
import {
  GET_PRODUCT_FEEDBACKS_QUERY,
  ADD_PRODUCT_FEEDBACK_MUTATION,
} from "./query";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import {
  GetProductFeedbacksData,
  GetProductFeedbacksVars,
  AddProductFeedbackVars,
  AddProductFeedbackData,
} from "./types";
import FeedbackForm, { IFormValues } from "./FeedbackForm";
import { FormikHelpers } from "formik";

interface IFeedbacksProps {
  product: IProduct;
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

  const client = useApolloClient();

  const [
    addProductFeedback,
    { loading: addProductFeedbackLoading },
  ] = useMutation<AddProductFeedbackData, AddProductFeedbackVars>(
    ADD_PRODUCT_FEEDBACK_MUTATION,
    {
      onCompleted: ({ addProductFeedback }) => {
        const queryCache = client.readQuery({
          query: GET_PRODUCT_FEEDBACKS_QUERY,
          variables: {
            productId: product.id,
          },
        });

        const { getProductFeedbacks } = queryCache;

        const newProductFeedbacks = [
          ...getProductFeedbacks,
          addProductFeedback,
        ];

        client.writeQuery({
          query: GET_PRODUCT_FEEDBACKS_QUERY,
          variables: {
            productId: product.id,
          },
          data: {
            getProductFeedbacks: newProductFeedbacks,
          },
        });
      },
    }
  );

  const handleSumbit = React.useCallback(
    async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
      if (addProductFeedbackLoading) {
        return;
      }

      try {
        const response = await addProductFeedback({
          variables: {
            productId: product.id,
            feedback: values,
          },
        });

        if (!response || !response.data || !response.data.addProductFeedback) {
          throw new Error("error creating a product");
        }

        alert("successfully created a feedback");
        actions.setSubmitting(false);
        actions.resetForm();
      } catch (err) {
        alert("error creating a product");
        console.log(err);
        actions.setSubmitting(false);
      }
    },
    [addProductFeedback, addProductFeedbackLoading]
  );

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
      <FeedbackForm onSubmit={handleSumbit} />
    </div>
  );
};

export default Feedbacks;
