import React from "react";
import { IProduct } from "../Product/types";
import { FEEDBACKS_QUERY, CREATE_FEEDBACK_MUTATION } from "./query";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import {
  FeedbacksData,
  FeedbacksVars,
  CreateFeedbackVars,
  CreateFeedbackData,
  IFeedback,
} from "./types";
import FeedbackForm, { IFormValues } from "./FeedbackForm";
import { FormikHelpers } from "formik";
import Comments from "../Comments";

interface IFeedbacksProps {
  product: IProduct;
}

const Feedbacks: React.FC<IFeedbacksProps> = ({ product }) => {
  const [
    selectedFeedback,
    setSelectedFeedback,
  ] = React.useState<IFeedback | null>(null);

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
          feedbacks: updatedFeedbacks,
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

        if (!response || !response.data || !response.data.createFeedback) {
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
    [product.id, createFeedback, createFeedbackLoading]
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

  if (!selectedFeedback && data.feedbacks.length > 0) {
    setSelectedFeedback(data.feedbacks[0]);
  }

  return (
    <div className="w-full">
      <div
        className={`w-full md:w-2/3 pr-6 ${
          selectedFeedback ? "m-0" : " mx-auto"
        }`}
      >
        {data.feedbacks.length < 1 ? (
          <p className="text-gray-700 text-xl py-16 text-center">
            Be the first to give a feedback
          </p>
        ) : null}
        {data.feedbacks.map((feedback) => {
          const isActive =
            selectedFeedback && selectedFeedback.id === feedback.id;
          return (
            <div
              key={feedback.id}
              className={`group transition duration-200 hover:bg-purple-500 ${
                isActive ? "bg-purple-500" : "bg-white"
              } shadow-md rounded-md p-4 my-4 cursor-pointer`}
            >
              <div
                className={`text-xl mb-1 ${
                  isActive ? "text-white" : "text-purple-500"
                } group-hover:text-white font-semibold`}
              >
                {feedback.title}
              </div>
              <p
                className={`text-md ${
                  isActive ? "text-white" : "text-gray-800"
                } group-hover:text-white`}
              >
                {feedback.description}
              </p>
            </div>
          );
        })}
        <FeedbackForm onSubmit={handleSumbit} />
      </div>
      {selectedFeedback ? (
        <div className="fixed top-0 right-0 min-h-screen w-1/3 bg-purple-200 pt-20 pb-3 overflow-x-hidden overflow-y-auto shadow-md">
          <Comments
            productId={product.id}
            issueNumber={Number(selectedFeedback.id)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Feedbacks;
