package br.com.localizapet.repository;

import br.com.localizapet.models.Marker;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MarkerRepository extends MongoRepository<Marker, String> {
    @Query("{$and: [ {type: {$regex: ?0, $options: 'i' }}, {title: {$regex: ?1, $options: 'i' }}, {ownerId: { $in: ?2 }} ] }")
    List<Marker> findAllByTypeAndTitleIgnoreCaseContainsAndOwnerId(String type, String title, List<String> ownerId);

    @Query("{$and: [ {type: {$regex: ?0, $options: 'i' }}, {title: {$regex: ?1, $options: 'i' }} ] }")
    List<Marker> findAllByTypeAndTitleIgnoreCaseContains(String type, String title);

    Marker findByOwnerId(String id);
}
