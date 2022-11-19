package br.com.localizapet.payload.response;

import br.com.localizapet.models.enums.ERole;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(of = "id")
@ToString(of = "id")
public class UserResponse {
    private String id;
    private String username;
    private String name;
    private String email;
    private List<ERole> roles;
    private String bio;
    private String photo;
    private String phoneNumber;
    private String pixKey;
    private boolean needDonation;
}
