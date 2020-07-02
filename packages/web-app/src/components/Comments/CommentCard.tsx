import React from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import { IComment } from "../../views/Comments/types";

interface ICommentCardProps {
  isFirst: boolean;
  isLast: boolean;
}

const CommentCard: React.FC<ICommentCardProps & IComment> = ({
  isFirst,
  isLast,
  user,
  body,
}) => {
  return (
    <div
      className={`relative shadow-md bg-white px-8 ${
        isFirst && "rounded-t-md pt-4"
      } ${isLast && "rounded-b-md"}`}
    >
      <div className="flex items-center">
        <img
          src={user.avatarUrl}
          className="w-8 h-8 shadow-xs rounded mr-2"
          alt={user.username}
        />
        <a
          href={`https://github.com/${user.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-md font-semibold text-gray-700 cursor-pointer hover:underline truncate"
        >
          {user.username}
        </a>
      </div>
      <div className="ml-4 pl-5 pt-4 pb-5 border-l markdown">
        <ReactMarkdown className="text-gray-800 text-lg" source={body} />
      </div>
    </div>
  );
};

export default CommentCard;
