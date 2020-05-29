require("dotenv").config();
import { ApolloError, ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express from "express";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { v4 } from "uuid";
import * as db from "./database/model";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";
import { ContextWithDBModel } from "./types";
import { authMiddleware } from "./utils/authMiddleware";

const app = express();

const {
  MONGO_URL = "mongodb://localhost/gitback",
  CLIENT_HOST,
  API_HOST,
} = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB Connection Error:")
);

mongoose.connection.once("open", function () {
  console.log("MongoDB connected!");
});

// list of allowed origins
const whitelist = [CLIENT_HOST, API_HOST];

// Options for Cross-origin resource sharing(CORS)
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
      // callback(new Error("Not allowed by CORS"));
    }
  },
  // credentials: true, // <- enable CORS response for requests with credentials (cookies, http authentication)
};

// allow requests from only specified origins
app.use(cors(corsOptions));

// cookie parser to parse cookies from the request
app.use(cookieParser());

app.use(authMiddleware);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, db } as ContextWithDBModel),
  formatError: (error: GraphQLError) => {
    if (error.originalError instanceof ApolloError) {
      return error;
    }

    const errId = v4();
    console.log("errId: ", errId);
    console.log(error);

    return new GraphQLError(`Internal Error: ${errId}`);
  },
});

server.applyMiddleware({ app, path: "/", cors: false });

// The `listen` method launches a web server.
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
