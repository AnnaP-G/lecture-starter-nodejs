import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAllUsers() {
    const users = userRepository.getAll();
    if (users.length === 0) {
      return [];
    }
    return users;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createUser(user) {
    const users = userRepository.create(user);
    if (!users) {
      return null;
    }
    return users;
  }

  updateUser(id, body) {
    const user = userRepository.update(id, body);
    if (!user) {
      return null;
    }
    return user;
  }

  deleteUser(id) {
    const user = userRepository.delete(id);
    if (!user) {
      return null;
    }
    return user;
  }
}

const userService = new UserService();

export { userService };

// TODO: Implement methods to work with user
