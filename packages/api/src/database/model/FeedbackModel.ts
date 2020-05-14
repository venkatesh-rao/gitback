import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./UserModel";
import { IProduct } from "./ProductModel";
import { IStatus } from "./StatusModel";

// Schema
const FeedbackSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
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
  issueNumber: number;
}

// DO NOT export
interface IFeedbackBase extends IFeedbackSchema {}

// Export this for strong typing
export interface IFeedback extends IFeedbackBase {
  product: IProduct["_id"];
}

// Export this for strong typing
export interface IFeedback_product_populated extends IFeedbackBase {
  product: IProduct;
}

// Static methods
FeedbackSchema.statics.findMyProduct = async function (id: string) {
  return this.findById(id).populate("product").exec();
};

// For model
export interface IFeedbackModel extends Model<IFeedback> {
  findMyProduct(id: string): Promise<IFeedback_product_populated>;
}

// Default export
export default model<IFeedback, IFeedbackModel>("Feedback", FeedbackSchema);
