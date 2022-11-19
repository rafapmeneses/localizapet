package br.com.localizapet.controllers;

import br.com.localizapet.payload.request.SignupRequest;
import br.com.localizapet.payload.request.LoginRequest;
import br.com.localizapet.payload.response.SigninResponse;
import br.com.localizapet.payload.response.MessageResponse;
import br.com.localizapet.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/signin")
	public ResponseEntity<SigninResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
		return authService.login(loginRequest);
	}

	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	@PostMapping("/signup")
	public ResponseEntity<MessageResponse> register(@Valid @RequestBody SignupRequest signUpRequest) {
		authService.register(signUpRequest);
		return ResponseEntity.ok(new MessageResponse("Usuário registrado com sucesso!"));
	}
}
