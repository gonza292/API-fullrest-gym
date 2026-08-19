class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAll() {
        return this.userRepository;
    }
}

export default UserService;