import React, { memo, FC } from "react";
import { IUser } from "../EnhancedRoutes/types";
import { IFeedback } from "../../views/Feedbacks/types";

interface INewCommentFormProps {
  loggedInUser?: IUser;
  feedback: IFeedback;
}

const NewCommentForm: FC<INewCommentFormProps> = memo(({ loggedInUser }) => {
  return (
    <div className="flex flex-row pb-8 border-b border-gray-300">
      {loggedInUser ? (
        <img
          src={loggedInUser.avatarUrl}
          alt={loggedInUser.username}
          className="h-10 w-10 shadow-xs rounded"
        />
      ) : (
        <div className="h-10 w-10 shadow-xs rounded leading-10 text-center bg-gray-200 text-gray-800">
          A
        </div>
      )}
      <textarea
        className="flex-1 md:flex-auto md:max-w-md w-full rounded ml-6 px-2 py-3 resize-none bg-white border border-gray-300 hover:shadow-md outline-none focus:shadow-outline overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
        style={{
          minHeight: "5rem",
          maxHeight: "12rem",
        }}
        placeholder="Type here to comment..."
      />
    </div>
  );
});

export default NewCommentForm;
