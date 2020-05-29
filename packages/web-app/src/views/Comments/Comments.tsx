import React from "react";
import {
  CommentsData,
  CommentsVars,
  IComment,
  FeedbackData,
  FeedbackVars,
} from "./types";
import { useQuery } from "@apollo/client";
import { COMMENTS_QUERY, FEEDBACK_QUERY } from "./query";
import { useParams } from "react-router-dom";
import CommentCard from "../../components/Comments/CommentCard";
import FeedbackHeader from "../../components/Feedbacks/FeedbackHeader";
import NewCommentForm from "../../components/Comments/NewCommentForm";
import { IUser } from "../Home/types";
import { IHeaderData } from "../../components/EnhancedRoutes/DefaultRoute";

const COMMENTS_LIMIT = 10;

interface ICommentsProps {
  setHeader?: (headerData: IHeaderData) => void;
  loggedInUser?: IUser;
}

interface ICommentsParams {
  productUrl?: string | undefined;
  issueNumber?: string | undefined;
}

const Comments: React.FC<ICommentsProps> = (props) => {
  const params = useParams<ICommentsParams>();

  const [hasAllLoaded, setAllLoaded] = React.useState(false);

  const { data, loading, error, fetchMore, networkStatus } = useQuery<
    CommentsData,
    CommentsVars
  >(COMMENTS_QUERY, {
    variables: {
      productUrl: params.productUrl!,
      issueNumber: Number(params.issueNumber!),
      limit: COMMENTS_LIMIT,
      offset: 0,
    },
  });

  const {
    data: feedbackData,
    loading: feedbackLoading,
    error: feedbackError,
    networkStatus: feedbackNetworkStatus,
  } = useQuery<FeedbackData, FeedbackVars>(FEEDBACK_QUERY, {
    variables: {
      productUrl: params.productUrl!,
      issueNumber: Number(params.issueNumber!),
    },
  });

  React.useEffect(() => {
    if (props.setHeader && feedbackData?.feedback.product) {
      const { name: title, url: link } = feedbackData.feedback.product;
      props.setHeader({ title, link });
    }
  }, [props, feedbackData]);

  const handleLoadMore = React.useCallback(() => {
    if (hasAllLoaded || loading) return;

    fetchMore({
      variables: {
        offset: data?.comments.length,
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (
          (!fetchMoreResult.comments ||
            fetchMoreResult.comments.length < COMMENTS_LIMIT) &&
          !hasAllLoaded
        ) {
          setAllLoaded(true);
        }
        return {
          ...prev,
          comments: [
            ...(prev.comments as Array<IComment>),
            ...(fetchMoreResult.comments as Array<IComment>),
          ],
        };
      },
    });
  }, [hasAllLoaded, setAllLoaded, loading, data, fetchMore]);

  if (loading && (networkStatus === 1 || networkStatus === 2)) {
    return <p>Loading</p>;
  }

  if (
    feedbackLoading &&
    (feedbackNetworkStatus === 1 || feedbackNetworkStatus === 2)
  ) {
    return <p>Loading</p>;
  }

  if (error || feedbackError) {
    return (
      <p style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(error, null, 2)}</p>
    );
  }

  if (!data || !data.comments || !feedbackData || !feedbackData.feedback) {
    return null;
  }

  if (data.comments.length < COMMENTS_LIMIT && !hasAllLoaded) {
    setAllLoaded(true);
  }

  const isLoadingMore = loading && networkStatus === 3;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <FeedbackHeader {...feedbackData.feedback} />
      <NewCommentForm
        loggedInUser={props.loggedInUser}
        feedback={feedbackData.feedback}
      />
      <h6 className="text-gray-700 font-semibold mt-8 mb-6 block">Comments</h6>
      {data.comments.length < 1 ? (
        <p className="text-gray-600 text-center my-3">
          Be the first to comment!
        </p>
      ) : null}
      {data.comments.map((comment, index) => {
        const isFirst = index === 0;
        const isLast = index >= data.comments.length - 1;
        return (
          <CommentCard
            key={comment.id}
            isFirst={isFirst}
            isLast={isLast}
            {...comment}
          />
        );
      })}
      {data.comments.length > 0 ? (
        <div className="w-full my-4 text-center">
          {!hasAllLoaded ? (
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className={`mx-auto my-4 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded ${
                isLoadingMore && "opacity-50 pointer-events-none"
              }`}
            >
              {isLoadingMore ? "Loading..." : "Load more..."}
            </button>
          ) : (
            <p className="text-gray-600">You have seen all the comments</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
