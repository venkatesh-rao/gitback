require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import express from "express";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import createToken from "./utils/create-token";

const app = express();

// cookie parser to parse cookies from the request
app.use(cookieParser());

app.use(async (req, res, next) => {
  const accessTokenCookie = req.cookies["gitback-at"];

  // if not access token present, skip this step
  if (!accessTokenCookie) {
    return next();
  }
  // parse the access token
  try {
    const githubAccessToken = verify(
      accessTokenCookie,
      process.env.ACCESS_TOKEN_SECRET || ""
    ) as string;

    if (!githubAccessToken) {
      throw new Error("Unauthorized user!");
    }

    (req as any).githubAccessToken = githubAccessToken;

    const token = createToken(githubAccessToken);

    let cookieAttributes = {};

    res.cookie("gitback-at", token, {
      ...cookieAttributes,
      maxAge: 3456000000,
    });
  } catch (err) {
    return next();
  }

  return next();
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app, path: "/" });

// The `listen` method launches a web server.
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
