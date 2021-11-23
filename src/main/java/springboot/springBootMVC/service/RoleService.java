package springboot.springBootMVC.service;

import javassist.NotFoundException;
import springboot.springBootMVC.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {

    List<Role> getAllRoles();

    void add(Role role);

    void update(Role role);

    Role getById(long id);

    Role getByName(String roleName) throws NotFoundException;

    Set<Role> getRoleSet(String[] role) throws NotFoundException;
}
