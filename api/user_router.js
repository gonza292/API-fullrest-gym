import express from "express";

const createUserRouter = (userService) => {

  const router = express.Router();

  router.get("/", async (req, res) => {

    const users = await userService.getAll();

    res.json(users.map(user => ({
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        role: user.role
    })));
});

router.get("/:username", async (req, res) => {

    const username  = req.params.username;

    const user = await userService.getByUsername(username);

    if (!user) {
      return res.status(404).json({ 
        message: "Usuario no encontrado" 
      });
    }

    res.json({
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        role: user.role
    });
  });

  router.post('/', async (req, res) => {

        try {

            const user = req.body;

            const newUser = await userService.add(user);

            res.status(201).json(newUser);

        } catch (error) {

            res.status(400).json({
                message: error.message
            });

        }

    });
  
  router.patch('/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const data = req.body;

        const updatedUser = await userService.update(username, data);

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

router.delete("/:username", async (req, res) => {
    
    const username = req.params.username;

    const deleted = await userService.removeByUsername(username);

    if (!deleted) {
        return res.status(404).json({
            message: "Usuario no encontrado"
        });
    }

    res.status(204).send();

});
return router;
};

export default createUserRouter;