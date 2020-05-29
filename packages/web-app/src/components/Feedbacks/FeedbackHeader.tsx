import React from "react";
import { IFeedback } from "../../views/Feedbacks/types";

interface IFeedbackHeaderProps {}

const FeedbackHeader: React.FC<IFeedbackHeaderProps & IFeedback> = React.memo(
  ({ user, title, description }) => {
    return (
      <div className="cursor-pointer relative mb-4 py-4 flex">
        <img
          className="mt-2 w-10 h-10 shadow-xs rounded"
          src={user.avatarUrl}
          alt={user.username}
        />
        <div className="ml-6 flex-1">
          <h6 className="block flex-1 text-2xl font-semibold text-gray-800 cursor-pointer hover:underline mb-1">
            {title}
          </h6>
          <p className="text-md text-gray-700">{description}</p>
        </div>
        <div className="absolute right-0 top-0 inline-block pr-4 cursor-pointer">
          <span className="text-2xl text-gray-600 tracking-wider">...</span>
        </div>
      </div>
    );
  }
);

export default FeedbackHeader;
