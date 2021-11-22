package springboot.springBootMVC.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import springboot.springBootMVC.model.User;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);
    User getById(Long id);
    User findByEmail(String email);

}
