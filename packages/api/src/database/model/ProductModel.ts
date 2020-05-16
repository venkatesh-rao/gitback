import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./UserModel";

// Schema
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    repositoryName: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    developers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// DO NOT export this
interface IProductSchema extends Document {
  name: string;
  url: string;
  repositoryName: string;
}

// DO NOT export
interface IProductBase extends IProductSchema {}

// Export this for strong typing
export interface IProduct extends IProductBase {
  owner: IUser["_id"];
  developers: IUser["_id"][];
}

// Export this for strong typing
export interface IProduct_owner_populated extends IProductBase {
  owner: IUser;
}

export interface IProduct_developers_populated extends IProductBase {
  developers: IUser[];
}

// Static methods
ProductSchema.statics.findMyOwner = async function (id: string) {
  return this.findById(id).populate("owner").exec();
};

ProductSchema.statics.findMyDevelopers = async function (id: string) {
  return this.findById(id).populate("developers").exec();
};

// For model
export interface IProductModel extends Model<IProduct> {
  findMyOwner(id: string): Promise<IProduct_owner_populated>;
  findMyDevelopers(id: string): Promise<IProduct_developers_populated>;
}

// Default export
export default model<IProduct, IProductModel>("Product", ProductSchema);
