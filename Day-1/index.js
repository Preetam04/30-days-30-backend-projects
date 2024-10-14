import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, PORT } from "./constant.js";

const app = express();

// the server should alwas be stateless, it is very easy to make a schema a connect this to a mongo db database, but as it is a very basic project decided to store it over the server.
const users = [];

app.use(express.json({ limit: "16kb" }));

app.post("/api/sign-up", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide users email or password",
    });
  }

  const token = jwt.sign(email, JWT_SECRET);

  //   the password should be stored like this as it should be hashed before storing
  users.push({
    id: users.length + 1,
    email,
    password,
  });

  return res.json({
    status: 200,
    token: token,
    message: "User Signed up Successfully",
  });
});

app.post("/api/sign-in", (req, res) => {
  const { email, password } = req.body;
  //   console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide users email or password",
    });
  }

  const { token } = req.headers;

  const validToken = jwt.verify(token, JWT_SECRET);

  console.log(validToken);

  if (!validToken) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }

  const foundUser = users.filter((ele) => ele.email === email)[0];

  if (!foundUser) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }

  const isPasswordCorrect = foundUser.password === password;

  if (!isPasswordCorrect) {
    return res.status(404).json({
      status: 404,
      message: "Password is not correct",
    });
  }

  return res.json({
    status: 200,
    message: "User Signed In Successfully!",
  });
});

app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
