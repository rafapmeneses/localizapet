package br.com.localizapet.payload.response;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(of = "id")
@ToString(of = "id")
public class SigninResponse {
	private String token;
	private String id;
	private String username;
	private String email;
	private List<String> roles;
}
