package br.com.localizapet.payload.request;

import br.com.localizapet.models.Marker;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode()
@ToString()
public class UserRequest {
    private String username;
    private String name;
    private String email;
    private String bio;
    private String photo;
    private String phoneNumber;
    private String pixKey;
    private Marker marker;
    private boolean needDonation;
}
