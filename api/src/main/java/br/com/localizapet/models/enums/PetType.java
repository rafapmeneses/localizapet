package br.com.localizapet.models.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PetType {
    DOG("Cachorro"),
    CAT("Gato"),
    ANOTHER("Outro");

    private String name;
}
