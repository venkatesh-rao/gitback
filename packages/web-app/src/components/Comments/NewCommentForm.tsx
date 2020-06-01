import React, { FC, memo } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { IFeedback } from "../../views/Feedbacks/types";
import { IUser } from "../EnhancedRoutes/types";
import "./tooltip.css";

interface INewCommentFormProps {
  loggedInUser?: IUser;
  feedback: IFeedback;
}

const NewCommentForm: FC<INewCommentFormProps> = memo(({ loggedInUser }) => {
  return (
    <div className="pb-8 border-b border-gray-300">
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
              id="avatar"
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
              data-for="avatar"
              className="h-10 w-10 shadow-xs rounded leading-10 text-center bg-gray-200 text-gray-800"
            >
              A
            </div>
          </>
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
      <button
        className="my-4 ml-16 bg-purple-800 hover:bg-purple-900 text-white py-2 px-4 rounded"
        onClick={() => alert("yet to be implemented")}
      >
        Post
      </button>
    </div>
  );
});

export default NewCommentForm;
