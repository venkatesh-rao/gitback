import { Document, Model, model, Schema } from "mongoose";

// Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    publicEmail: {
      type: String,
    },
    userType: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    installationId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

enum UserType {
  User = 0,
  ProductOwner = 1,
}

// DO NOT export this
interface IUserSchema extends Document {
  name?: string;
  username: string;
  avatarUrl: string;
  publicEmail?: string;
  installationId?: number;
  userType: UserType;
}

// Methods
UserSchema.methods.getUserType = function () {
  return this.userType > 0 ? "ProductOwner" : "User";
};

// DO NOT export
interface IUserBase extends IUserSchema {
  getUserType(): string;
}

// Export this for strong typing
export interface IUser extends IUserBase {}

export interface IUserModel extends Model<IUser> {}

// Default export
export default model<IUser, IUserModel>("User", UserSchema);
