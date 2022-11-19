package br.com.localizapet.repository;

import br.com.localizapet.models.Role;
import br.com.localizapet.models.enums.ERole;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
