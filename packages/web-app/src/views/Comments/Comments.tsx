import React from "react";
import { CommentsData, CommentsVars } from "./types";
import { useQuery } from "@apollo/client";
import { COMMENTS_QUERY } from "./query";
import ReactMarkdown from "react-markdown";

interface ICommentsProps {
  productId: string;
  issueNumber: number;
}

const Comments: React.FC<ICommentsProps> = (props) => {
  const { productId, issueNumber } = props;

  const { data, loading, error } = useQuery<CommentsData, CommentsVars>(
    COMMENTS_QUERY,
    {
      variables: {
        productId,
        issueNumber,
      },
    }
  );

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <p style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(error, null, 2)}</p>
    );
  }

  if (!data || !data.comments) {
    return null;
  }

  return (
    <div>
      {data.comments.map((comment) => {
        return (
          <div className="px-6 border-b-2 border-gray-100 py-2">
            <ReactMarkdown source={comment.body} />
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
