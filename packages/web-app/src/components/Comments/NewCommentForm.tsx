import React, { FC, memo } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { IFeedback } from "../../views/Feedbacks/types";
import { IUser } from "../EnhancedRoutes/types";
import "./tooltip.css";
import { useMutation, useApolloClient } from "@apollo/client";
import {
  CREATE_COMMENT_MUTATION,
  COMMENTS_QUERY,
} from "../../views/Comments/query";
import { COMMENTS_LIMIT } from "../../views/Comments/Comments";
import {
  CreateCommentVars,
  CreateCommentData,
} from "../../views/Comments/types";
import {
  Formik,
  Form,
  Field,
  FormikProps,
  FieldProps,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";

interface INewCommentFormProps {
  loggedInUser?: IUser;
  feedback: IFeedback;
  issueNumber: number;
}

const CreateCommentSchema = Yup.object().shape({
  issueNumber: Yup.number().required(),
  productUrl: Yup.string().required(),
  commentBody: Yup.string().required("Required"),
});

const NewCommentForm: FC<INewCommentFormProps> = memo(
  ({ loggedInUser, feedback, issueNumber }) => {
    const { product } = feedback;

    const { url: productUrl } = product;

    const client = useApolloClient();

    const [createComment, { loading }] = useMutation<
      CreateCommentData,
      CreateCommentVars
    >(CREATE_COMMENT_MUTATION, {
      onCompleted: ({ createComment: newComment }) => {
        const queryCache = client.readQuery({
          query: COMMENTS_QUERY,
          variables: {
            productUrl: productUrl,
            issueNumber: issueNumber,
            limit: COMMENTS_LIMIT,
            offset: 0,
          },
        });

        const { comments } = queryCache;

        const updatedComments = [...comments, newComment];

        client.writeQuery({
          query: COMMENTS_QUERY,
          variables: {
            productUrl: productUrl,
            issueNumber: issueNumber,
            limit: COMMENTS_LIMIT,
            offset: 0,
          },
          data: {
            comments: updatedComments,
          },
        });
      },
    });

    const initialValues: CreateCommentVars = React.useMemo(
      () => ({
        issueNumber,
        productUrl,
        commentBody: "",
      }),
      [issueNumber, productUrl]
    );

    const handleSubmit = React.useCallback(
      async (
        values: CreateCommentVars,
        actions: FormikHelpers<CreateCommentVars>
      ) => {
        await createComment({
          variables: values,
        });
        actions.setSubmitting(false);
        actions.resetForm();
        return;
      },
      [createComment]
    );

    return (
      <div className="pb-8 border-b border-gray-300">
        <Formik
          initialValues={initialValues}
          validationSchema={CreateCommentSchema}
          onSubmit={handleSubmit}
        >
          {({ dirty, isValid }: FormikProps<CreateCommentVars>) => (
            <Form>
              <div className="flex flex-row">
                {loggedInUser ? (
                  <img
                    src={loggedInUser.avatarUrl}
                    alt={loggedInUser.username}
                    className="h-10 w-10 shadow-xs rounded"
                  />
                ) : (
                  <>
                    <ReactTooltip
                      id="comment-avatar"
                      type="dark"
                      effect="solid"
                      className="hover-remain-tooltip"
                      delayHide={1000}
                    >
                      <div className="text-center">
                        Your reply will be posted as Anonymous. <br />
                        <Link className="underline font-bold" to="/login">
                          Login
                        </Link>{" "}
                        to post in our username
                      </div>
                    </ReactTooltip>
                    <div
                      data-tip
                      data-for="comment-avatar"
                      className="h-10 w-10 shadow-xs rounded leading-10 text-center bg-gray-200 text-gray-800"
                    >
                      A
                    </div>
                  </>
                )}
                <Field name="commentBody">
                  {({ field }: FieldProps) => (
                    <textarea
                      className="flex-1 md:flex-auto md:max-w-md w-full rounded ml-6 px-2 py-3 resize-none bg-white border border-gray-300 hover:shadow-md outline-none focus:shadow-outline overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
                      style={{
                        minHeight: "5rem",
                        maxHeight: "12rem",
                      }}
                      placeholder="Type here to comment..."
                      {...field}
                    />
                  )}
                </Field>
              </div>
              <button
                className="my-4 ml-16 bg-purple-800 hover:bg-purple-900 text-white py-2 px-4 rounded"
                type="submit"
                disabled={loading || !dirty || !isValid}
              >
                Post
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);

export default NewCommentForm;
