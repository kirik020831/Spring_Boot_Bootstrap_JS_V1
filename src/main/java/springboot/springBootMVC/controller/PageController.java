package springboot.springBootMVC.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import springboot.springBootMVC.dao.UserRepository;
import springboot.springBootMVC.model.User;
import springboot.springBootMVC.service.RoleService;
import springboot.springBootMVC.service.UserService;

import java.security.Principal;


@Controller
@RequestMapping("/")
public class PageController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final RoleService roleService;


    public PageController(UserRepository userRepository, UserService userService, RoleService roleService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("admin")
    public String adminPage(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("getAll",userService.getAllUsers());
        model.addAttribute("getAllRoles",roleService.getAllRoles());
        model.addAttribute("user",user);
        return "admin-page";
    }

    @GetMapping("user")
    public String userPage(ModelMap modelMap, Principal principal) {
        User user = userRepository.findByUsername(principal.getName());
        modelMap.addAttribute("user", user);
        return "user-page";
    }
}
