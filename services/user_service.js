class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAll() {
        return this.userRepository;
    }

    getByUsername(username) {
        return this.userRepository.find(
            user => user.username === username
        );
}

add (user) {

    if (!user.username || !user.name || !user.role) {
        throw new Error(" faltan datos del usuario ");
    }

    const userExists = this.getByUsername(user.username);

    if (userExists) {
        throw new Error("El usuario ya existe");
    }

    this.userRepository.push(user);
    
    return user;
  
  }

update(username, data) {

    const user = this.getByUsername(username);

    if (!user) {
        return undefined;
 }
 if (data.username && data.username !== username) {
    const userExists = this.getByUsername(data.username);

    if (userExists) {
        throw new Error("El nuevo nombre de usuario ya existe");
    }
 }
 if (data.username !== undefined) {
    user.username = data.username;
 }
 if (data.name !== undefined) {
    user.name = data.name;
 }  
 if (data.role !== undefined) {
    user.role = data.role;
 }
   return user;
  }
}
export default UserService;