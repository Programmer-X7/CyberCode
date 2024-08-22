package in.smcoder.cybercode.service;

import in.smcoder.cybercode.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createCoder(User user);
    User createAdmin(User user);
    List<User> getAllUsers();
    User getUserById(String id);
    User updateUserDetails(User user);
    boolean updateUserPassword(String id, String newPassword);
    boolean updateUserStatus(String id);
    void deleteUser(String id);
}
