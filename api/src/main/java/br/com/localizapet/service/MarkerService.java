package br.com.localizapet.service;

import br.com.localizapet.models.Pet;
import br.com.localizapet.models.User;
import br.com.localizapet.models.enums.TypeInMap;
import br.com.localizapet.repository.PetRepository;
import br.com.localizapet.service.utils.GetMarkerService;
import br.com.localizapet.service.utils.GetUserService;
import br.com.localizapet.service.utils.VerificationThrow;
import br.com.localizapet.mapper.MarkerMapper;
import br.com.localizapet.models.Marker;
import br.com.localizapet.payload.response.MarkerResponse;
import br.com.localizapet.repository.MarkerRepository;
import br.com.localizapet.service.utils.GetPetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MarkerService {

    @Autowired
    private MarkerRepository markerRepository;

    @Autowired
    private GetUserService getUserService;

    @Autowired
    private GetMarkerService getMarkerService;

    @Autowired
    private GetPetService getPetService;

    @Autowired
    private PetRepository petRepository;

    public MarkerResponse showMarker(String ownerId) {
        return MarkerMapper.toResponse(markerRepository.findByOwnerId(ownerId));
    }

    public List<MarkerResponse> showMarkers(String typeInMap, String title, boolean owner) {
        User user = getUserService.getLoggedUser();

        if(owner){
            List<Pet> pets = petRepository.findAllByUserId(user.getId());

            List<String> ownerIds = pets.stream().map(Pet::getId).collect(Collectors.toList());

            ownerIds.add(user.getId());

            return MarkerMapper.toListResponse(markerRepository.findAllByTypeAndTitleIgnoreCaseContainsAndOwnerId(typeInMap, title, ownerIds));
        }

        return MarkerMapper.toListResponse(markerRepository.findAllByTypeAndTitleIgnoreCaseContains(typeInMap, title));
    }

    public void deleteMarker(String markerId) {
        User user = getUserService.getLoggedUser();

        Marker marker = getMarkerService.getMarkerById(markerId);

        if(!marker.getType().equals(TypeInMap.INSTITUTION)){
            Pet pet = getPetService.getPetById(marker.getOwnerId());
            VerificationThrow.permissionVerification(pet.getUserId(), user.getId());
        }
        else{
            VerificationThrow.permissionVerification(marker.getOwnerId(), user.getId());
        }

        markerRepository.deleteById(markerId);
    }

}
