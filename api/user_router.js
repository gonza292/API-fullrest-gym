import express from "express";

const createUserRouter = (userService) => {

  const router = express.Router();

  router.get("/", (req, res) => {

    const users = userService.getAll();

    res.json(users);
});

return router;
};

export default createUserRouter;