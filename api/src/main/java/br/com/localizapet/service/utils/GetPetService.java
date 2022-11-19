package br.com.localizapet.service.utils;

import br.com.localizapet.models.Pet;
import br.com.localizapet.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class GetPetService {
    @Autowired
    private PetRepository petRepository;

    public Pet getPetById(String petId){
        return petRepository
                .findById(petId)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Não existe um pet com esse id."));
    }

}
