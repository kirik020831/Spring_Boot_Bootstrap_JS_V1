package springboot.springBootMVC.service;

import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import springboot.springBootMVC.model.User;

// «Пользователь» – это просто Object. В большинстве случаев он может быть
//  приведен к классу UserDetails.
// Для создания UserDetails используется интерфейс UserDetailsService, с единственным методом:
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Autowired
    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        User user = null;
        try {
            user = userService.getByEmail(name);
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", name));
        }
        return user;
    }
}