package br.com.localizapet.service.utils;

import br.com.localizapet.models.User;
import br.com.localizapet.repository.UserRepository;
import br.com.localizapet.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class GetUserService {
    @Autowired
    private UserRepository userRepository;

    public User getLoggedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();

        return userRepository
                .findById(userDetailsImpl.getId())
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Não foi possivel encontrar um usuário com esse id."));
    }

    public User getUser(String id){
        return userRepository
                .findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Não foi possivel encontrar um usuário com esse id."));
    }

}
