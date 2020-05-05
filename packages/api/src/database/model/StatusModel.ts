import { Document, Model, model, Schema } from "mongoose";

// Schema
const StatusSchema = new Schema({
  label: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
  },
});

// DO NOT export this
interface IStatusSchema extends Document {
  label: string;
  description?: string;
}

// DO NOT export
interface IStatusBase extends IStatusSchema {}

// Export this for strong typing
export interface IStatus extends IStatusBase {}

export interface IStatusModel extends Model<IStatus> {}

// Default export
export default model<IStatus, IStatusModel>("Status", StatusSchema);
