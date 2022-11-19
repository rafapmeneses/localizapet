package br.com.localizapet.repository;

import br.com.localizapet.models.Pet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PetRepository extends MongoRepository<Pet, String> {

    List<Pet> findAllByUserId(String userId);

    List<Pet> findAllByUserIdAndNameIgnoreCaseContains(String userId, String name);
}
