package br.com.localizapet.service.utils;

import br.com.localizapet.models.Marker;
import br.com.localizapet.repository.MarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class GetMarkerService {

    @Autowired
    private MarkerRepository markerRepository;

    public Marker getMarkerById(String markerId){
        return markerRepository
                .findById(markerId)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Não existe um marcador com esse id."));
    }
}
