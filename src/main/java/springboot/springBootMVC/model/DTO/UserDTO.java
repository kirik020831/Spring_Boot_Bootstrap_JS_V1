package springboot.springBootMVC.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private long id;
    private String username;
    private String lastname;
    private byte age;
    private String email;
    public String password;
    Set<String> roleNames;
}
