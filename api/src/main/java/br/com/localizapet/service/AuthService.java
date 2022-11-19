package br.com.localizapet.service;

import br.com.localizapet.models.Role;
import br.com.localizapet.models.User;
import br.com.localizapet.models.enums.ERole;
import br.com.localizapet.payload.request.LoginRequest;
import br.com.localizapet.payload.request.SignupRequest;
import br.com.localizapet.repository.RoleRepository;
import br.com.localizapet.repository.UserRepository;
import br.com.localizapet.security.jwt.JwtUtils;
import br.com.localizapet.security.services.UserDetailsImpl;
import br.com.localizapet.mapper.SigninMapper;
import br.com.localizapet.payload.response.SigninResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    private static final String ERRO_CARGO = "Erro: Cargo não encontrado.";

    public ResponseEntity<SigninResponse> login(LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        User user = userRepository
                .findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Não foi possivel encontrar um usuário com esse id."));

        SigninResponse signinResponse = SigninMapper.toResponse(user);

        return ResponseEntity.ok(new SigninResponse(jwt,
                signinResponse.getId(),
                signinResponse.getUsername(),
                signinResponse.getEmail(),
                roles));
    }

    public void register(SignupRequest signUpRequest){
        if (Boolean.TRUE.equals(userRepository.existsByUsername(signUpRequest.getUsername()))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Este nome de usuário já foi utilizado!");
        }

        if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Este email já foi utilizado!");
        }

        User user = User.builder()
                .email(signUpRequest.getEmail())
                .username(signUpRequest.getUsername())
                .name(signUpRequest.getName())
                .bio(signUpRequest.getBio())
                .password(encoder.encode(signUpRequest.getPassword()))
                .build();

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException(ERRO_CARGO));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException(ERRO_CARGO));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException(ERRO_CARGO));
                        roles.add(modRole);

                        break;
                    case "institution":
                        Role institutionRole = roleRepository.findByName(ERole.ROLE_INSTITUTION)
                                .orElseThrow(() -> new RuntimeException(ERRO_CARGO));
                        roles.add(institutionRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException(ERRO_CARGO));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
    }
}
