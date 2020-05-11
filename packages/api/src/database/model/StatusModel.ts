import { Document, Model, model, Schema } from "mongoose";

// Schema
const StatusSchema = new Schema(
  {
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// DO NOT export this
interface IStatusSchema extends Document {
  label: string;
  slug: string;
  description?: string;
}

// DO NOT export
interface IStatusBase extends IStatusSchema {}

// Export this for strong typing
export interface IStatus extends IStatusBase {}

export interface IStatusModel extends Model<IStatus> {}

// Default export
export default model<IStatus, IStatusModel>("Status", StatusSchema);
