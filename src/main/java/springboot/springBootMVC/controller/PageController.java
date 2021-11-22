package springboot.springBootMVC.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import springboot.springBootMVC.dao.UserRepository;
import springboot.springBootMVC.model.User;

import java.security.Principal;


@Controller
@RequestMapping("/")
public class PageController {

    private final UserRepository userRepository;

    public PageController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("admin")
    public String adminPage(ModelMap model, Principal principal) {
        model.addAttribute("user", userRepository.findByUsername(principal.getName()));
        return "admin-page";
    }

    @GetMapping("user")
    public String userPage(ModelMap modelMap, Principal principal) {
        User user = userRepository.findByUsername(principal.getName());
        modelMap.addAttribute("user", user);
        return "user-page";
    }

    @GetMapping("getUser")
    public ResponseEntity<User> getUser(Principal principal) {
        User user = userRepository.findByUsername(principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
