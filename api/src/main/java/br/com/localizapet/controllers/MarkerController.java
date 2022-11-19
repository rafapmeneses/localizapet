package br.com.localizapet.controllers;

import br.com.localizapet.payload.response.MarkerResponse;
import br.com.localizapet.service.MarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/marker")
public class MarkerController {

    @Autowired
    private MarkerService markerService;

    @GetMapping("/show/{ownerId}")
    public MarkerResponse showMarker(@PathVariable String ownerId) {
        return markerService.showMarker(ownerId);
    }

    @GetMapping("/list")
    public List<MarkerResponse> showMarkers(
            @RequestParam(required = false) String typeInMap,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) boolean owner
    ) {
        return markerService.showMarkers(typeInMap, title, owner);
    }

    @DeleteMapping("/{markerId}/delete")
    public void deleteMarker(@PathVariable String markerId) {
        markerService.deleteMarker(markerId);
    }
}
