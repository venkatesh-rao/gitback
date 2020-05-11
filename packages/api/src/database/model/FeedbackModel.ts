import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./UserModel";
import { IProduct } from "./ProductModel";
import { IStatus } from "./StatusModel";

// Schema
const FeedbackSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    issueNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// DO NOT export this
interface IFeedbackSchema extends Document {
  title: string;
  description?: string;
  issueNumber: number;
}

// DO NOT export
interface IFeedbackBase extends IFeedbackSchema {}

// Export this for strong typing
export interface IFeedback extends IFeedbackBase {
  product: IProduct["_id"];
  owner: IUser["_id"];
  status: IStatus["_id"];
}

// Export this for strong typing
export interface IFeedback_product_populated extends IFeedbackBase {
  product: IProduct;
}

export interface IFeedback_owner_populated extends IFeedbackBase {
  owner: IUser;
}

export interface IFeedback_status_populated extends IFeedbackBase {
  status: IStatus;
}

// Static methods
FeedbackSchema.statics.findMyOwner = async function (id: string) {
  return this.findById(id).populate("owner").exec();
};

FeedbackSchema.statics.findMyProduct = async function (id: string) {
  return this.findById(id).populate("product").exec();
};

FeedbackSchema.statics.findMyStatus = async function (id: string) {
  return this.findById(id).populate("status").exec();
};

// For model
export interface IFeedbackModel extends Model<IFeedback> {
  findMyOwner(id: string): Promise<IFeedback_owner_populated>;
  findMyProduct(id: string): Promise<IFeedback_product_populated>;
  findMyStatus(id: string): Promise<IFeedback_status_populated>;
}

// Default export
export default model<IFeedback, IFeedbackModel>("Feedback", FeedbackSchema);
