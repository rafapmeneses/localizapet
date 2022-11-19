package br.com.localizapet.mapper;

import br.com.localizapet.payload.response.PetResponse;
import br.com.localizapet.models.Pet;
import br.com.localizapet.payload.request.PetRequest;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor(access= AccessLevel.PRIVATE)
public class PetMapper {
    public static Pet toEntity(PetRequest request) {
        return Pet.builder()
                .name(request.getName())
                .type(request.getType())
                .race(request.getRace())
                .photo(request.getPhoto())
                .description(request.getDescription())
                .situation(request.getMarker().getType())
                .build();
    }

    public static List<PetResponse> toListResponse(List<Pet> pets) {
        return pets.stream().map(PetMapper::toResponse).collect(Collectors.toList());
    }

    public static PetResponse toResponse(Pet pet) {
        return PetResponse.builder()
                .id(pet.getId())
                .name(pet.getName())
                .userId(pet.getUserId())
                .type(pet.getType())
                .race(pet.getRace())
                .photo(pet.getPhoto())
                .description(pet.getDescription())
                .situation(pet.getSituation())
                .build();
    }
}
