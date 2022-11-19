package br.com.localizapet.mapper;

import br.com.localizapet.models.Role;
import br.com.localizapet.models.User;
import br.com.localizapet.payload.request.UserRequest;
import br.com.localizapet.payload.response.UserResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.stream.Collectors;

@NoArgsConstructor(access= AccessLevel.PRIVATE)
public class UserMapper {

    public static User toEntity(UserRequest request) {
        return User.builder()
                .username(request.getUsername())
                .name(request.getName())
                .email(request.getEmail())
                .bio(request.getBio())
                .photo(request.getPhoto())
                .phoneNumber(request.getPhoneNumber())
                .pixKey(request.getPixKey())
                .needDonation(request.isNeedDonation())
                .build();
    }

    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                .email(user.getEmail())
                .name(user.getName())
                .username(user.getUsername())
                .bio(user.getBio())
                .photo(user.getPhoto())
                .phoneNumber(user.getPhoneNumber())
                .pixKey(user.getPixKey())
                .needDonation(user.isNeedDonation())
                .build();
    }

    public static UserResponse toResponseFullUser(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .username(user.getUsername())
                .bio(user.getBio())
                .photo(user.getPhoto())
                .phoneNumber(user.getPhoneNumber())
                .pixKey(user.getPixKey())
                .needDonation(user.isNeedDonation())
                .build();
    }

    public static UserResponse toResponseBasicUser(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }
}
