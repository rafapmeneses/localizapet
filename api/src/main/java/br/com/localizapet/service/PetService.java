package br.com.localizapet.service;

import br.com.localizapet.mapper.PetMapper;
import br.com.localizapet.models.User;
import br.com.localizapet.models.enums.TypeInMap;
import br.com.localizapet.payload.request.PetRequest;
import br.com.localizapet.payload.response.PetResponse;
import br.com.localizapet.service.utils.GetUserService;
import br.com.localizapet.mapper.MarkerMapper;
import br.com.localizapet.models.Marker;
import br.com.localizapet.models.Pet;
import br.com.localizapet.payload.request.MarkerRequest;
import br.com.localizapet.repository.MarkerRepository;
import br.com.localizapet.repository.PetRepository;
import br.com.localizapet.service.utils.GetPetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;

import static br.com.localizapet.service.utils.VerificationThrow.*;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private MarkerRepository markerRepository;

    @Autowired
    private GetUserService getUserService;

    @Autowired
    private GetPetService getPetService;

    public PetResponse showPet(String petId) {
        return PetMapper.toResponse(getPetService.getPetById(petId));
    }

    public List<PetResponse> showPetsByName(String name) {
        User user = getUserService.getLoggedUser();
        return PetMapper.toListResponse(petRepository.findAllByUserIdAndNameIgnoreCaseContains(user.getId(), name));
    }

    public List<PetResponse> showPets() {
        User user = getUserService.getLoggedUser();
        return PetMapper.toListResponse(petRepository.findAllByUserId(user.getId()));
    }

    public void savePet(PetRequest petRequest) {
        User user = getUserService.getLoggedUser();

        if(petRequest.getMarker().getType().equals(TypeInMap.INSTITUTION)){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Pet não pode ser cadastrado como tipo instituição.");
        }

        if(petRequest.getMarker().getLat()==null && petRequest.getMarker().getLng()==null){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Pet precisa ser cadastrado como um ponto no mapa.");
        }

        MarkerRequest markerRequest = MarkerRequest.builder()
                .type(petRequest.getMarker().getType())
                .lat(petRequest.getMarker().getLat())
                .lng(petRequest.getMarker().getLng())
                .title(petRequest.getName())
                .build();

        Marker petMarker = MarkerMapper.toEntity(markerRequest);

        Pet pet = PetMapper.toEntity(petRequest);
        pet.setUserId(user.getId());
        pet.setSituation(petMarker.getType());

        Pet savedPet = petRepository.save(pet);

        petMarker.setOwnerId(savedPet.getId());

        markerRepository.save(petMarker);
    }

    public void updatePet(String petId, PetRequest petRequest) {
        User user = getUserService.getLoggedUser();

        Pet pet = getPetService.getPetById(petId);

        permissionVerification(pet.getUserId(), user.getId());

        if(petRequest.getMarker().getType().equals(TypeInMap.INSTITUTION)){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Pet não pode ser cadastrado como tipo instituição.");
        }

        if(petRequest.getMarker().getLat()==null && petRequest.getMarker().getLng()==null){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Pet precisa ser cadastrado como um ponto no mapa.");
        }

        Pet petInfo = PetMapper.toEntity(petRequest);

        if( fieldNullAndBlankVerification(petInfo.getName()) ){
            pet.setName(petInfo.getName());
        }

        if( fieldNullAndBlankVerification(petInfo.getDescription()) ){
            pet.setDescription(petInfo.getDescription());
        }

        if( fieldNullAndBlankVerification(petInfo.getRace().getName()) ){
            pet.setRace(petInfo.getRace());
        }

        if( fieldNullAndBlankVerification(petInfo.getSituation().getName()) ){
            pet.setSituation(petInfo.getSituation());
        }

        if( fieldNullAndBlankVerification(petInfo.getType().getName()) ){
            pet.setType(petInfo.getType());
        }

        if( fieldNullAndBlankVerification(petInfo.getPhoto()) ){
            pet.setPhoto(petInfo.getPhoto());
        }

        Marker existingMarker = markerRepository.findByOwnerId(pet.getId());

        MarkerRequest markerRequest = MarkerRequest.builder()
                .type(petRequest.getMarker().getType())
                .lat(petRequest.getMarker().getLat())
                .lng(petRequest.getMarker().getLng())
                .title(pet.getName())
                .build();

        Marker petMarker = MarkerMapper.toEntity(markerRequest);

        if(fieldNullAndBlankVerification(petMarker.getType().getName())){
            existingMarker.setType(petMarker.getType());
        }

        if(fieldNullAndBlankVerification(petMarker.getTitle())){
            existingMarker.setTitle(petMarker.getTitle());
        }

        if(petMarker.getLat() != null){
            existingMarker.setLat(petMarker.getLat());
        }

        if(petMarker.getLng() != null){
            existingMarker.setLng(petMarker.getLng());
        }

        pet.setSituation(petMarker.getType());

        petRepository.save(pet);
        markerRepository.save(existingMarker);
    }

    public void deletePet(String petId) {
        User user = getUserService.getLoggedUser();

        Pet pet = getPetService.getPetById(petId);

        permissionVerification(pet.getUserId(), user.getId());

        petRepository.deleteById(petId);
    }
}
