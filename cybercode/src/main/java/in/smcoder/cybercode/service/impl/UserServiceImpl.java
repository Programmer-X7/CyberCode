package in.smcoder.cybercode.service.impl;

import in.smcoder.cybercode.entity.User;
import in.smcoder.cybercode.repository.UserRepository;
import in.smcoder.cybercode.service.UserService;
import in.smcoder.cybercode.utils.PasswordHashingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Value("${user.profileImage}")
    private String defaultProfileImage;

    private final UserRepository userRepository;
    private final PasswordHashingUtil passwordHashingUtil;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordHashingUtil passwordHashingUtil) {
        this.userRepository = userRepository;
        this.passwordHashingUtil = passwordHashingUtil;
    }

    @Override
    public User createCoder(User user) {

        // Hash plain text password before saving
        String hashedPassword = passwordHashingUtil.hashPassword(user.getPassword());
        user.setPassword(hashedPassword);

        // Set Default Attributes
        user.setProfileImage(defaultProfileImage);
        user.setActive(true);
        user.setRole("ROLE_CODER");

        return userRepository.findByUsername(user.getUsername()).orElseGet(() -> userRepository.save(user));
    }

    @Override
    public User createAdmin(User user) {

        // Hash plain text password before saving
        String hashedPassword = passwordHashingUtil.hashPassword(user.getPassword());
        user.setPassword(hashedPassword);

        // Set Default Attributes
        user.setProfileImage(defaultProfileImage);
        user.setActive(true);
        user.setRole("ROLE_ADMIN");

        return userRepository.findByUsername(user.getUsername()).orElseGet(() -> userRepository.save(user));
    }

    @Override
    public List<User> getAllUsers() {
        return new ArrayList<>(userRepository.findAll());
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User updateUserDetails(User user) {
        User existingUser = userRepository.findById(user.getId()).orElse(null);
        if (existingUser == null) return null;
        else {
            existingUser.setUsername(user.getUsername());
            existingUser.setName(user.getName());
            existingUser.setProfileImage(user.getProfileImage());

            return userRepository.save(existingUser);
        }
    }

    @Override
    public boolean updateUserPassword(String id, String newPassword) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) return false;
        else {
            // Hash plain text password before saving
            String hashedPassword = passwordHashingUtil.hashPassword(newPassword);

            existingUser.setPassword(hashedPassword);
            userRepository.save(existingUser);
            return true;
        }
    }

    @Override
    public boolean updateUserStatus(String id) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) return false;
        else {
            existingUser.setActive(!existingUser.isActive());

            userRepository.save(existingUser);
            return true;
        }
    }

    @Override
    public void deleteUser(String id) {
        userRepository.findById(id).ifPresent(user -> userRepository.deleteById(user.getId()));
    }
}
