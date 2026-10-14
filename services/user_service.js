class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getAll() {
        return await this.userRepository.find();
    }

    async getByUsername(username) {
        return await this.userRepository.findOne({ username });
    }

    async add(user) {
        if (!user.username) {
            throw new Error("El nombre de usuario es obligatorio");
        }

        if (!user.password) {
            throw new Error("La contraseña es obligatoria");
        }

        if (user.password === "1234") {
            throw new Error("La contraseña no puede ser 1234");
        }

        const existentUser = await this.userRepository.find({
            username: user.username
        });

        if (existentUser.length) {
            throw new Error("El nombre de usuario ya existe");
        }

        return this.userRepository.create(user);
    }

    async removeByUsername(username) {
        const user = await this.userRepository.findOne({ username });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        return this.userRepository.deleteOne({ username });
    }
}

export default UserService;