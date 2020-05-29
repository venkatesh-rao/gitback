import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { FormikHelpers } from "formik";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Modal, useModal } from "react-morphing-modal";
import "react-morphing-modal/dist/ReactMorphingModal.css";
import FeedbackCard from "../../components/Feedbacks/FeedbackCard";
import { IProduct } from "../Product/types";
import FeedbackForm, { IFormValues } from "./FeedbackForm";
import { CREATE_FEEDBACK_MUTATION, FEEDBACKS_QUERY } from "./query";
import {
  CreateFeedbackData,
  CreateFeedbackVars,
  FeedbacksData,
  FeedbacksVars,
} from "./types";

const FEEDBACKS_LIMIT = 10;

interface IFeedbacksProps {
  product: IProduct;
}

const Feedbacks: React.FC<IFeedbacksProps> = ({ product }) => {
  const { modalProps, getTriggerProps } = useModal({
    background: "#00000090",
  });

  const triggerProps = getTriggerProps();

  const { data, loading, error } = useQuery<FeedbacksData, FeedbacksVars>(
    FEEDBACKS_QUERY,
    {
      variables: {
        productId: product.id,
        limit: FEEDBACKS_LIMIT,
        offset: 0,
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

  return (
    <div className="relative">
      <div className="max-w-2xl w-full transition-all ease duration-300 mx-auto mb-20 xl:mb-0">
        {data.feedbacks.length < 1 ? (
          <p className="text-gray-700 text-xl py-16 text-center">
            Be the first to give a feedback
          </p>
        ) : null}
        {data.feedbacks.map((feedback) => {
          return (
            <FeedbackCard
              to={`/${product.url}/${feedback.id}`}
              key={feedback.id}
              {...feedback}
            />
          );
        })}
      </div>
      <div
        className="fixed z-20 h-10 px-4 bg-purple-800 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-transform duration-300 transform hover:-translate-y-1"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
        }}
        {...triggerProps}
      >
        <FaPlus className="text-sm text-white mr-2" />
        <p className="text-white">Add Feedback</p>
      </div>
      <Modal {...modalProps}>
        <div className="block w-full max-w-2xl mx-auto bg-white rounded-md shadow-md p-4 my-4">
          <FeedbackForm onSubmit={handleSumbit} />
        </div>
      </Modal>
    </div>
  );
};

export default Feedbacks;
