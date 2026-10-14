import express from "express";
import mongoose from "mongoose";

import usersMongo from "./mongo-db/user_mongo.js";
import UserService from "./services/user_service.js";
import createUserRouter from "./api/user_router.js";

const app = express();

app.use(express.json());

const userService = new UserService(usersMongo);

const userRouter = createUserRouter(userService);

app.use("/users", userRouter);

const PORT = 3000;

await mongoose.connect("mongodb://127.0.0.1:27017/gimnasio");

console.log("conectado a MongoDB");

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});