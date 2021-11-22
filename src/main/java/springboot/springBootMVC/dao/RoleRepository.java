package springboot.springBootMVC.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import springboot.springBootMVC.model.Role;
@EnableJpaRepositories
public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByName(String role);
    Role getById(Long id);
}

