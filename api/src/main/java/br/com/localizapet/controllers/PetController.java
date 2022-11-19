package br.com.localizapet.controllers;

import br.com.localizapet.payload.response.PetResponse;
import br.com.localizapet.payload.request.PetRequest;
import br.com.localizapet.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/pet")
public class PetController {
    @Autowired
    private PetService petService;

    @GetMapping("/{petId}")
    public PetResponse showPet(@PathVariable String petId) {
        return petService.showPet(petId);
    }

    @GetMapping("/list")
    public List<PetResponse> showPets() {
        return petService.showPets();
    }

    @GetMapping("/list/{name}")
    public List<PetResponse> showPetsByName(@PathVariable String name) {
        return petService.showPetsByName(name);
    }

    @PostMapping("/save")
    public void savePet(@Valid @RequestBody PetRequest petRequest) {
        petService.savePet(petRequest);
    }

    @PutMapping("/update/{petId}")
    public void updatePet(@PathVariable String petId, @Valid @RequestBody PetRequest petRequest) {
        petService.updatePet(petId, petRequest);
    }

    @DeleteMapping("/{petId}/delete")
    public void deletePet(@PathVariable String petId) {
        petService.deletePet(petId);
    }
}
