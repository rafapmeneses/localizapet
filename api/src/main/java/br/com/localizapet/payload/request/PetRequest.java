package br.com.localizapet.payload.request;

import br.com.localizapet.models.enums.PetType;
import br.com.localizapet.models.enums.Race;
import br.com.localizapet.models.Marker;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode()
@ToString()
public class PetRequest {
    @NotBlank
    private String name;
    @NotNull
    private Marker marker;
    private PetType type;
    private Race race;
    private String photo;
    private String description;
}
