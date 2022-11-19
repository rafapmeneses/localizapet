package br.com.localizapet.payload.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode()
@ToString()
public class MessageResponse {
	private String message;
}
