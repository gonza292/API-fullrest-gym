import express from "express";

import users from "./mockups/user_mockup.js";
import UserService from "./services/user_service.js";
import createUserRouter from "./api/user_router.js";

const app = express();

app.use(express.json());

const userService = new UserService(users);

const userRouter = createUserRouter(userService);

app.use("/users", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});