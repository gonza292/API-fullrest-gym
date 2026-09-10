import express from "express";

const createUserRouter = (userService) => {

  const router = express.Router();

  router.get("/", (req, res) => {

    const users = userService.getAll();

    res.json(users);
});

router.get("/:username", (req, res) => {

    const username  = req.params.username;

    const user = userService.getByUsername(username);

    if (!user) {
      return res.status(404).json({ 
        message: "Usuario no encontrado" 
      });
    }

    res.json(user);
  });

  router.post('/', (req, res) => {

        try {

            const user = req.body;

            const newUser = userService.add(user);

            res.status(201).json(newUser);

        } catch (error) {

            res.status(400).json({
                message: error.message
            });

        }

    });
  
  router.patch('/:username', (req, res) => {
    try {
        const username = req.params.username;
        const data = req.body;

        const updatedUser = userService.update(username, data);

        if (!updatedUser) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

  });

return router;
};

export default createUserRouter;