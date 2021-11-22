package springboot.springBootMVC.controller;

import javassist.NotFoundException;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot.springBootMVC.model.DTO.UserDTO;
import springboot.springBootMVC.model.Role;
import springboot.springBootMVC.model.User;
import springboot.springBootMVC.service.RoleService;
import springboot.springBootMVC.service.UserService;


import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<List<User>> addNewUser(@RequestBody UserDTO userDTO) throws NotFoundException {
        User user = new User(userDTO);
        user.setRoles(roleService.getRoleSet(userDTO));
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserId(@PathVariable("id") int id) {
        User user = userService.getById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<User> editUser(@RequestBody UserDTO userDTO) throws NotFoundException {
        User user = new User(userDTO);
        user.setRoles(roleService.getRoleSet(userDTO));
        userService.update(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
        User user = userService.getById(id);
        userService.delete(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}