import React from "react";
import { IFeedback } from "../../views/Feedbacks/types";
import { Link } from "react-router-dom";

interface IFeedbackCardProps {
  to: string;
}

const FeedbackCard: React.FC<IFeedbackCardProps & IFeedback> = ({
  to,
  user,
  title,
  description,
}) => {
  return (
    <Link
      to={to}
      className="block cursor-pointer relative shadow-md rounded-md bg-white mb-4 py-4 px-8 flex"
    >
      <img
        className="mt-1 w-10 h-10 shadow-xs rounded"
        src={user.avatarUrl}
        alt={user.username}
      />
      <div className="ml-4 flex-1">
        <h6 className="flex-1 text-lg font-semibold text-gray-700 cursor-pointer hover:underline truncate">
          {title}
        </h6>
        <p
          className="text-md text-gray-600 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
      </div>
      {/* <div className="absolute right-0 top-0 inline-block pr-4 cursor-pointer">
        <span className="text-xl text-gray-600 tracking-wider">...</span>
      </div> */}
    </Link>
  );
};

export default FeedbackCard;
