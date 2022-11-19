package br.com.localizapet.models;

import br.com.localizapet.models.enums.PetType;
import br.com.localizapet.models.enums.Race;
import br.com.localizapet.models.enums.TypeInMap;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode()
@ToString()
@Document(collection = "pets")
public class Pet {
    @Id
    private String id;

    @NotBlank
    private String userId;

    @NotBlank
    private String name;

    @NotBlank
    private String markerId;

    private PetType type;

    private Race race;

    private String photo;

    private String description;

    private TypeInMap situation;

}
