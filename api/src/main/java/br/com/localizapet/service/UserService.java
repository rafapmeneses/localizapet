package br.com.localizapet.service;

import br.com.localizapet.models.User;
import br.com.localizapet.models.enums.TypeInMap;
import br.com.localizapet.mapper.MarkerMapper;
import br.com.localizapet.mapper.UserMapper;
import br.com.localizapet.models.Marker;
import br.com.localizapet.models.enums.ERole;
import br.com.localizapet.payload.request.MarkerRequest;
import br.com.localizapet.payload.request.UserRequest;
import br.com.localizapet.payload.response.UserResponse;
import br.com.localizapet.repository.MarkerRepository;
import br.com.localizapet.repository.UserRepository;
import br.com.localizapet.service.utils.GetMarkerService;
import br.com.localizapet.service.utils.GetUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static br.com.localizapet.service.utils.VerificationThrow.fieldNullAndBlankVerification;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MarkerRepository markerRepository;

    @Autowired
    private GetUserService getUserService;

    @Autowired
    private GetMarkerService getMarkerService;

    public UserResponse getLoggedUser() {
        User user = getUserService.getLoggedUser();
        return UserMapper.toResponse(user);
    }

    public UserResponse getBasicUser(String id) {
        return UserMapper.toResponseBasicUser(getUserService.getUser(id));
    }

    public UserResponse getFullUser(String id) {
        return UserMapper.toResponseFullUser(getUserService.getUser(id));
    }

    public void updateUser(UserRequest userRequest) {
        User user = getUserService.getLoggedUser();
        User userInfo = UserMapper.toEntity(userRequest);

        if( fieldNullAndBlankVerification(userInfo.getUsername()) ){
            user.setUsername(userInfo.getUsername());
        }
        if( fieldNullAndBlankVerification(userInfo.getName()) ){
            user.setName(userInfo.getName());
        }
        if( fieldNullAndBlankVerification(userInfo.getEmail()) ){
            user.setEmail(userInfo.getEmail());
        }
        if( fieldNullAndBlankVerification(userInfo.getBio()) ){
            user.setBio(userInfo.getBio());
        }
        if( fieldNullAndBlankVerification(userInfo.getPhoto()) ){
            user.setPhoto(userInfo.getPhoto());
        }
        if( fieldNullAndBlankVerification(userInfo.getPhoneNumber()) ){
            user.setPhoneNumber(userInfo.getPhoneNumber());
        }
        if( fieldNullAndBlankVerification(userInfo.getPixKey()) ){
            user.setPixKey(userInfo.getPixKey());
        }
        if( userInfo.isNeedDonation() != user.isNeedDonation() ){
            user.setNeedDonation(userInfo.isNeedDonation());
        }

        if(userRequest.getMarker() != null){
            MarkerRequest markerRequest = MarkerRequest.builder()
                    .type(userRequest.getMarker().getType())
                    .lat(userRequest.getMarker().getLat())
                    .lng(userRequest.getMarker().getLng())
                    .build();

            if(!markerRequest.getType().equals(TypeInMap.INSTITUTION)){
                throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Instituição não pode ser cadastrado como tipo pet.");
            }

            boolean isInstitution = user.getRoles().stream().anyMatch(role -> role.getName().equals(ERole.ROLE_INSTITUTION));

            if(markerRequest.getLat() != null && markerRequest.getLng() != null && isInstitution){
                Marker existingMarker = markerRepository.findByOwnerId(user.getId());
                Marker institutionMarker = MarkerMapper.toEntity(markerRequest);
                if(existingMarker != null){
                    existingMarker.setLat(institutionMarker.getLat());
                    existingMarker.setLng(institutionMarker.getLng());
                    existingMarker.setOwnerId(user.getId());
                    existingMarker.setTitle(user.getName());
                    markerRepository.save(existingMarker);
                }
                else{
                    institutionMarker.setOwnerId(user.getId());
                    institutionMarker.setTitle(user.getName());
                    markerRepository.save(institutionMarker);
                }
            }
        }

        userRepository.save(user);
    }
}
