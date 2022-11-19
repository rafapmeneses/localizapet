package br.com.localizapet.mapper;

import br.com.localizapet.models.User;
import br.com.localizapet.payload.response.SigninResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access= AccessLevel.PRIVATE)
public class SigninMapper {
    public static SigninResponse toResponse(User user) {
        return SigninResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }
}
