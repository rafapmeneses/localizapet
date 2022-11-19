package br.com.localizapet.models.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Race {
    CORGI("Corgi"),
    BOXER("Boxer"),
    CHOW_CHOW("Chow chow"),
    ANOTHER("Outro");

    private String name;
}
