import React from "react";
import { IProduct } from "../CreateProduct/types";
import { FEEDBACKS_QUERY, CREATE_FEEDBACK_MUTATION } from "./query";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import {
  FeedbacksData,
  FeedbacksVars,
  CreateFeedbackVars,
  CreateFeedbackData,
} from "./types";
import FeedbackForm, { IFormValues } from "./FeedbackForm";
import { FormikHelpers } from "formik";

interface IFeedbacksProps {
  product: IProduct;
}

const Feedbacks: React.FC<IFeedbacksProps> = ({ product }) => {
  const { data, loading, error } = useQuery<FeedbacksData, FeedbacksVars>(
    FEEDBACKS_QUERY,
    {
      variables: {
        productId: product.id,
      },
    }
  );

  const client = useApolloClient();

  const [createFeedback, { loading: createFeedbackLoading }] = useMutation<
    CreateFeedbackData,
    CreateFeedbackVars
  >(CREATE_FEEDBACK_MUTATION, {
    onCompleted: ({ createFeedback }) => {
      const queryCache = client.readQuery({
        query: FEEDBACKS_QUERY,
        variables: {
          productId: product.id,
        },
      });

      const { feedbacks } = queryCache;

      const updatedFeedbacks = [...feedbacks, createFeedback];

      client.writeQuery({
        query: FEEDBACKS_QUERY,
        variables: {
          productId: product.id,
        },
        data: {
          getProductFeedbacks: updatedFeedbacks,
        },
      });
    },
  });

  const handleSumbit = React.useCallback(
    async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
      if (createFeedbackLoading) {
        return;
      }

      try {
        const response = await createFeedback({
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
    [createFeedback, createFeedbackLoading]
  );

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <p style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(error, null, 2)}</p>
    );
  }

  if (!data || !data.feedbacks) {
    return null;
  }

  return (
    <div className="max-w-full mx-auto md:max-w-lg lg:max-w-xl">
      {data.feedbacks.map((feedback) => {
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
