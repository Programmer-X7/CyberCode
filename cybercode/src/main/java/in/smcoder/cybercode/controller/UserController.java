package in.smcoder.cybercode.controller;

import in.smcoder.cybercode.entity.User;
import in.smcoder.cybercode.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create-coder")
    public ResponseEntity<User> createCoder(@RequestBody User user) {

        User savedUser = userService.createCoder(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/create-admin")
    public ResponseEntity<User> createAdmin(@RequestBody User user) {

        User savedUser = userService.createAdmin(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update-details")
    public ResponseEntity<User> updateUserDetails(@RequestBody User user) {
        User updatedUser = userService.updateUserDetails(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/update-password")
    public ResponseEntity<Boolean> updateUserPassword(@RequestParam(value = "userId") String userId,
                                                      @RequestParam(value = "newPassword") String newPassword) {
        boolean isUpdated = userService.updateUserPassword(userId, newPassword);
        return ResponseEntity.ok(isUpdated);
    }

    @PutMapping("/update-status/{userId}")
    public ResponseEntity<Boolean> updateUserActive(@PathVariable String userId) {
        boolean isUpdated = userService.updateUserStatus(userId);
        return ResponseEntity.ok(isUpdated);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}
