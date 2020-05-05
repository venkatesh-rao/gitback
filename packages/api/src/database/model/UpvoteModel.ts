import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./UserModel";
import { IFeedback } from "./FeedbackModel";

// Schema
const UpvoteSchema = new Schema(
  {
    feedback: {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
      required: true,
    },
    upvoter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// DO NOT export this
interface IUpvoteSchema extends Document {}

// DO NOT export
interface IUpvoteBase extends IUpvoteSchema {}

// Export this for strong typing
export interface IUpvote extends IUpvoteBase {
  feedback: IFeedback["_id"];
  upvoter: IUser["_id"];
}

// Export this for strong typing
export interface IUpvote_feedback_populated extends IUpvoteBase {
  feedback: IFeedback;
}

export interface IUpvote_upvoter_populated extends IUpvoteBase {
  upvoter: IUser;
}

// Static methods
UpvoteSchema.statics.findMyFeedback = async function (id: string) {
  return this.findById(id).populate("feedback").exec();
};

UpvoteSchema.statics.findMyUpvoter = async function (id: string) {
  return this.findById(id).populate("upvoter").exec();
};

// For model
export interface IUpvoteModel extends Model<IUpvote> {
  findMyFeedback(id: string): Promise<IUpvote_feedback_populated>;
  findMyFeedback(id: string): Promise<IUpvote_upvoter_populated>;
}

// Default export
export default model<IUpvote, IUpvoteModel>("Upvote", UpvoteSchema);
