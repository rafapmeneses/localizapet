package br.com.localizapet.models.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TypeInMap {
    PET_ADOPTION("Pet para adoção"),
    LOST("Perdido"),
    INSTITUTION("Instituição");

    private String name;
}
