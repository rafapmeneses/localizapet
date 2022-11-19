package br.com.localizapet.payload.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode()
@ToString()
public class LoginRequest {
	@NotBlank
	private String username;

	@NotBlank
	private String password;
}
